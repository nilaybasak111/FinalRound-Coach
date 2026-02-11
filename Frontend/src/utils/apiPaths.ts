export const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate User & Return JWT Token
    GET_PROFILE: "/api/auth/profile", // Get Logged-In User Details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload Profile Picture
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate Interview Questions Using Gemini-2.5-flash
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate Concept Explanation Using Gemini-2.5-flash
  },

  SESSION: {
    CREATE: "/api/sessions/create", // Create A New Interview Session With Questions
    GET_ALL: "/api/sessions/my-sessions", // Get All User Sessions
    GET_ONE: (id: string) => `/api/sessions/${id}`, // Get Session Details With Questions
    DELETE: (id: string) => `/api/sessions/${id}`, // Delete A Session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add More Questions To A Session
    PIN: (id: string) => `/api/questions/${id}/pin`, // Pin or Unpin A Question
    UPDATE_NOTE: (id: string) => `/api/questions/${id}/note`, // Update or Add A Note To A Question
  },
};
