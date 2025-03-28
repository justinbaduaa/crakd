import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getAllFeedbacksByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params, searchParams }: {
  params: RouteParams['params'];
  searchParams: { tab?: string; feedbackId?: string };
}) => {
  const { id } = await params;
  const { tab, feedbackId } = await searchParams;
  const activeTab = tab || "latest";
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");
  
  // Redirect if user is not authenticated
  if (!user || !user.id) redirect("/");

  // Get all feedbacks for this interview
  const allFeedbacks = await getAllFeedbacksByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  // Sort feedbacks by date (newest first)
  const sortedFeedbacks = allFeedbacks.sort((a: Feedback, b: Feedback) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Get the latest feedback
  const latestFeedback = sortedFeedbacks.length > 0 ? sortedFeedbacks[0] : null;
  
  // Find the feedback with the highest score
  const highestScoreFeedback = sortedFeedbacks.length > 0 
    ? sortedFeedbacks.reduce((prev: Feedback, current: Feedback) => 
        (prev.totalScore > current.totalScore) ? prev : current
      )
    : null;

  // If a specific feedback ID is requested, find that feedback
  const selectedFeedbackId = feedbackId;
  const selectedFeedback = selectedFeedbackId
    ? sortedFeedbacks.find((f: Feedback) => f.id === selectedFeedbackId) || latestFeedback
    : latestFeedback;

  return (
    <section className="section-feedback">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold text-dark-100">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <Tabs defaultValue={activeTab} className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm rounded-full">
          <TabsTrigger 
            value="latest" 
            asChild 
            className="data-[state=active]:bg-[#F4EBDD] data-[state=active]:text-dark-100 text-dark-100 rounded-full py-2"
          >
            <Link href={`/interview/${id}/feedback?tab=latest`}>Latest Attempt</Link>
          </TabsTrigger>
          <TabsTrigger 
            value="highest" 
            asChild 
            className="data-[state=active]:bg-[#F4EBDD] data-[state=active]:text-dark-100 text-dark-100 rounded-full py-2"
          >
            <Link href={`/interview/${id}/feedback?tab=highest`}>Highest Score</Link>
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            asChild 
            className="data-[state=active]:bg-[#F4EBDD] data-[state=active]:text-dark-100 text-dark-100 rounded-full py-2"
          >
            <Link href={`/interview/${id}/feedback?tab=history`}>All Attempts</Link>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="latest" className="mt-6 bg-[#F9F5F1] p-6 rounded-2xl shadow-sm">
          {selectedFeedback ? (
            <FeedbackContent feedback={selectedFeedback} />
          ) : (
            <p>No feedback available yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="highest" className="mt-6 bg-[#F9F5F1] p-6 rounded-2xl shadow-sm">
          {highestScoreFeedback ? (
            <FeedbackContent feedback={highestScoreFeedback} />
          ) : (
            <p>No feedback available yet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-6 bg-[#F9F5F1] p-6 rounded-2xl shadow-sm">
          {sortedFeedbacks.length > 0 ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold">Interview History</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedFeedbacks.map((feedback: Feedback, index: number) => (
                  <div key={feedback.id} className="bg-[#F9F5F1] rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200">
                    <h3 className="text-lg font-medium text-dark-100">Attempt {index + 1}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Image src="/calendar.svg" width={18} height={18} alt="calendar" />
                        <p className="text-sm text-dark-100">{dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Image src="/star.svg" width={18} height={18} alt="star" />
                        <p className="text-sm text-dark-100 font-bold">{feedback.totalScore}/100</p>
                      </div>
                    </div>
                    <p className="line-clamp-2 mt-2 text-sm text-dark-100">{feedback.finalAssessment}</p>
                    <Button variant="link" asChild className="p-0 h-auto mt-2 text-[#6870A6]">
                      <Link href={`/interview/${id}/feedback?tab=latest&feedbackId=${feedback.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No feedback history available.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="buttons mt-6">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-primary flex-1">
          <Link
            href={`/interview/${id}?retake=true`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-black text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

// Separate component to display feedback content
const FeedbackContent = ({ feedback }: { feedback: Feedback }) => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p className="text-dark-100">
              Overall Impression:{" "}
              <span className="text-dark-100 font-bold">
                {feedback.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p className="text-dark-100">
              {feedback.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <p className="text-dark-100">{feedback.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="text-dark-100">Breakdown of the Interview:</h2>
        {feedback.categoryScores.map((category, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <p className="font-bold text-dark-100">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p className="text-dark-100 mt-2">{category.comment}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-6 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-dark-100">Strengths</h3>
        <ul>
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="text-dark-100">{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 mt-6 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="text-dark-100">Areas for Improvement</h3>
        <ul>
          {feedback.areasForImprovement.map((area, index) => (
            <li key={index} className="text-dark-100">{area}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Feedback;
