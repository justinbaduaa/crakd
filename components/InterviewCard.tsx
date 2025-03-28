import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getAllFeedbacksByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  let highestScore = null;
  let latestFeedback = null;
  let attemptCount = 0;
  
  if (userId && interviewId) {
    // Get all feedbacks for this interview
    const allFeedbacks = await getAllFeedbacksByInterviewId({
      interviewId,
      userId,
    });
    
    attemptCount = allFeedbacks.length;
    
    if (allFeedbacks.length > 0) {
      // Get the latest feedback
      const sortedFeedbacks = allFeedbacks.sort((a: Feedback, b: Feedback) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      latestFeedback = sortedFeedbacks[0];
      
      // Find the highest score
      highestScore = allFeedbacks.reduce((max, feedback) => 
        Math.max(max, feedback.totalScore), 0);
    }
  }

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-[#9CA3AF]",
      Mixed: "bg-[#9CA3AF]",
      Technical: "bg-[#9CA3AF]",
    }[normalizedType] || "bg-[#9CA3AF]";

  const formattedDate = dayjs(
    latestFeedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-2 right-2 w-fit px-4 py-1.5 rounded-full shadow-sm bg-opacity-85",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px] shadow-md"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{highestScore !== null ? `${highestScore}/100` : "---/100"}</p>
            </div>
          </div>

          {/* Number of Attempts */}
          {latestFeedback && (
            <div className="mt-2 text-sm text-dark-100 font-medium">
              {attemptCount} attempt{attemptCount !== 1 ? 's' : ''}
            </div>
          )}

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {latestFeedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                latestFeedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
              className="flex items-center"
            >
              {latestFeedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;

