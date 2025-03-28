import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();
  const userId = user?.id || '';

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(userId),
    getLatestInterviews({ userId }),
  ]);

  const hasPastInterviews = (userInterviews && userInterviews.length > 0) || false;
  const hasUpcomingInterviews = (allInterview && allInterview.length > 0) || false;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Prepare for Any Interview with AI-Powered Practice</h2>
          <p className="text-lg text-dark-100">
            From healthcare to finance, education to tech - master interviews in your field with personalized practice and feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview" prefetch={false}>Create an Interview</Link>
          </Button>
        </div>

        <Image
          src="/chicken.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Practice Sessions</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t practiced any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Available Interview Types</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interview templates available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
