import Vapi from "@vapi-ai/web";

// Initialize with error handling
let vapi: Vapi;

try {
  const token = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  
  if (!token) {
    console.error("VAPI Web Token is missing. Please check your environment variables.");
    throw new Error("VAPI Web Token is required");
  }
  
  vapi = new Vapi(token);
  console.log("VAPI SDK initialized successfully");
} catch (error) {
  console.error("Failed to initialize VAPI SDK:", error);
  // Create a fallback instance that will throw meaningful errors when used
  vapi = new Vapi("placeholder_token");
}

export { vapi };
