import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { type, role, level, techstack, amount, userid, profession, additionalInfo } = await request.json();

    // Default values for required fields
    const interviewRole = role || "General";
    const interviewType = type || "Mixed";
    const experienceLevel = level || "Mid-level";
    const skillsArray = techstack ? techstack.split(',').map((skill: string) => skill.trim()).filter(Boolean) : [];
    const questionAmount = amount !== undefined ? Number(amount) : 5;
    
    // Build the prompt based on the profession and provided information
    let promptContext = `Prepare questions for a job interview.`;
    
    if (profession) {
      promptContext += `\nThe profession is ${profession}.`;
    }
    
    promptContext += `
      The job role is ${interviewRole}.
      The job experience level is ${experienceLevel}.
      ${skillsArray.length > 0 ? `The key skills/requirements for this job are: ${skillsArray.join(', ')}.` : ''}
      The focus should be on ${interviewType} questions.
      The amount of questions required is: ${questionAmount}.`;
      
    if (additionalInfo) {
      promptContext += `\nAdditional context: ${additionalInfo}`;
    }
    
    promptContext += `
      Please return only the questions, without any additional text.
      The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
      Return the questions formatted like this:
      ["Question 1", "Question 2", "Question 3"]
      
      Thank you!
    `;

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: promptContext,
    });

    const interview = {
      role: interviewRole,
      type: interviewType,
      level: experienceLevel,
      techstack: skillsArray,
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
