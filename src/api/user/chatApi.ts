import axiosInstance from "../axiosInstance";
import { baseUrl } from "../constants/baseUrl";

// Fetch all users
export const fetchUsers = async () => {
  const response = await axiosInstance.get(`${baseUrl}/api/all`);
  return response.data.users; // Returning the array of users
};

// Get or create a conversation ID
export const getConversationId = async (targetUserId: string) => {
  const response = await axiosInstance.post(`${baseUrl}/api/chat/conversation`, {
    targetUserId,
  });
  return response.data; // { conversationId: "some-uuid" }
};
