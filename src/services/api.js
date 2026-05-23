import axios from "axios";

// Use environment variable for API base URL so it works in production too
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const sendMessageAPI = async (message) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/chat`, { message });
    return res.data.reply;
  } catch (error) {
    const status = error.response?.status;

    if (status === 401) {
      throw new Error("Authentication error: Invalid API key.");
    } else if (status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    } else if (status === 400) {
      throw new Error("Invalid request. Please check your message.");
    } else if (!error.response) {
      throw new Error("Network error: Unable to reach the server.");
    }

    throw new Error(error.response?.data?.error || "Failed to get a response from AI.");
  }
};