"use client";

import { useState } from "react";
import Image from "next/image";
import Agent from "./Agent";
import InterviewForm from "./InterviewForm";
import { Button } from "./ui/button";

interface InterviewOptionsProps {
  userName: string;
  userId?: string;
}

enum InterviewMethod {
  NONE = "NONE",
  CALL = "CALL",
  FORM = "FORM"
}

const InterviewOptions = ({ userName, userId }: InterviewOptionsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<InterviewMethod>(InterviewMethod.NONE);

  const handleSelectCall = () => {
    setSelectedMethod(InterviewMethod.CALL);
  };

  const handleSelectForm = () => {
    setSelectedMethod(InterviewMethod.FORM);
  };

  const handleBack = () => {
    setSelectedMethod(InterviewMethod.NONE);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {selectedMethod === InterviewMethod.NONE && (
        <div className="w-full max-w-2xl flex flex-col items-center mt-8">
          <h2 className="text-2xl font-bold mb-8">Choose Your Interview Format</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-shadow cursor-pointer" onClick={handleSelectCall}>
              <div className="size-[64px] rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Image 
                  src="/ai-avatar.png" 
                  alt="Call with AI" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Create with Voice</h3>
              <p className="text-center text-gray-500 mb-4">Have a conversation with AI to create a custom interview with your specific field and role</p>
              <Button className="btn-primary">Create an Interview with Voice</Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-shadow cursor-pointer" onClick={handleSelectForm}>
              <div className="size-[64px] rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Image 
                  src="/calendar.svg" 
                  alt="Fill out form" 
                  width={30} 
                  height={30}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">Create with Text</h3>
              <p className="text-center text-gray-500 mb-4">Complete a brief form to customize an interview for your specific field and role</p>
              <Button className="btn-primary">Customize Interview</Button>
            </div>
          </div>
        </div>
      )}
      
      {selectedMethod === InterviewMethod.CALL && (
        <div className="w-full max-w-2xl">
          <button 
            onClick={handleBack}
            className="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to options
          </button>
          
          <Agent
            userName={userName}
            userId={userId}
            type="generate"
          />
        </div>
      )}
      
      {selectedMethod === InterviewMethod.FORM && (
        <div className="w-full max-w-2xl">
          <button 
            onClick={handleBack}
            className="mb-4 flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to options
          </button>
          
          <h3 className="text-xl font-bold mb-4">Customize Your Interview</h3>
          <InterviewForm userId={userId} />
        </div>
      )}
    </div>
  );
};

export default InterviewOptions; 