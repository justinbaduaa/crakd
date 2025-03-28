"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import FormField from "./FormField";
import { Form } from "./ui/form";
import { Textarea } from "./ui/textarea";

interface InterviewFormProps {
  userId?: string;
}

interface FormValues {
  profession: string;
  role: string;
  experience: string;
  skills: string;
  interviewType: string;
  questionsAmount: number;
  additionalInfo: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      profession: "",
      role: "",
      experience: "",
      skills: "",
      interviewType: "Technical",
      questionsAmount: 1,
      additionalInfo: ""
    },
    // Set up validation rules
    criteriaMode: "all"
  });

  // Set up required field validation
  form.register("profession", { required: "Profession is required" });
  form.register("role", { required: "Role is required" });
  form.register("experience", { required: "Experience level is required" });
  form.register("skills", { required: "At least one skill is required" });

  const onSubmit = async (data: FormValues) => {
    if (!userId) {
      setError("User ID is required. Please log in.");
      return;
    }
    
    // Check for validation errors and display them
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      return; // React Hook Form will handle showing the errors
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Extract skills as an array
      const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      // Prepare the payload for the API
      const payload = {
        type: data.interviewType,
        role: data.role,
        level: data.experience,
        techstack: skillsArray.join(','),
        amount: data.questionsAmount,
        userid: userId,
        profession: data.profession,
        additionalInfo: data.additionalInfo
      };
      
      // Send data to the API
      const response = await fetch('/api/vapi/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Redirect to home page on success
        router.push("/");
      } else {
        throw new Error(result.error || "Failed to create interview");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(typeof error === 'object' && error !== null && 'message' in error 
        ? String(error.message) 
        : "Failed to create interview. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 max-w-2xl mx-auto">
        {/* Error Messages */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-medium">Please fix the following errors:</p>
            <ul className="list-disc pl-5">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <li key={field}>{error.message as string}</li>
              ))}
            </ul>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="profession"
          label="Profession *"
          placeholder="e.g. Software Development, Healthcare, Finance, Education"
        />
        
        <FormField
          control={form.control}
          name="role"
          label="Role *"
          placeholder="e.g. Developer, Nurse, Financial Analyst, Teacher"
        />
        
        <FormField
          control={form.control}
          name="experience"
          label="Experience Level *"
          placeholder="e.g. Entry-level, Mid-level, Senior, Management"
        />
        
        <FormField
          control={form.control}
          name="skills"
          label="Key Skills (comma-separated) *"
          placeholder="e.g. Project Management, Patient Care, Financial Modeling"
        />
        
        <div className="space-y-2">
          <label className="label">Interview Type <span className="text-red-500">*</span></label>
          <select
            {...form.register("interviewType", { required: "Interview type is required" })}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Mixed">Mixed</option>
            <option value="Case Study">Case Study</option>
            <option value="Situational">Situational</option>
          </select>
          {form.formState.errors.interviewType && (
            <p className="text-xs text-red-500">{form.formState.errors.interviewType.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="label">Number of Questions <span className="text-red-500">*</span></label>
          <input
            type="number"
            {...form.register("questionsAmount", { 
              valueAsNumber: true,
              required: "Number of questions is required",
              min: { value: 1, message: "Number of questions must be at least 1" }
            })}
            className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {form.formState.errors.questionsAmount && (
            <p className="text-xs text-red-500">{form.formState.errors.questionsAmount.message}</p>
          )}
          <p className="text-xs text-gray-500">Enter any number of questions you want</p>
        </div>
        
        <div className="space-y-2">
          <label className="label">Additional Information <span className="text-gray-400">(optional)</span></label>
          <Textarea
            {...form.register("additionalInfo")}
            placeholder="Any specific topics, scenarios, or questions you'd like to cover in the interview?"
            className="resize-none h-32"
          />
        </div>
        
        <Button 
          type="submit" 
          className="btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Generating Interview..." : "Generate Interview"}
        </Button>
      </form>
    </Form>
  );
};

export default InterviewForm; 