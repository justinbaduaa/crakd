import InterviewOptions from "@/components/InterviewOptions";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  
  // Redirect if user is not authenticated
  if (!user || !user.name) redirect("/");

  return (
    <>
      <h3>Interview Practice</h3>

      <InterviewOptions
        userName={user.name}
        userId={user.id}
      />
    </>
  );
};

export default Page;
