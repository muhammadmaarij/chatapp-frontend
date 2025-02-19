import axiosInstance from "@/api/axiosInstance";
import { baseUrl } from "../constants/baseUrl";


// Fetch chat history
export const fetchChatHistory = async (conversationId: string) => {
  const response = await axiosInstance.get(`${baseUrl}/api/chat/history/${conversationId}`);
  console.log(response.data.messages);
  return response.data.messages;
};


export const sendMessage = async (messageData: {
  conversation_id: string;
  type: string;
  content: string;
}) => {

    console.log(messageData,"messageData");
  const response = await axiosInstance.post(`${baseUrl}/api/chat/message`, messageData);
  return response.data.message; // Returning the sent message
};


export const sendMediaMessage = async (formData: FormData) => {
    const response = await axiosInstance.post(`${baseUrl}/api/chat/media`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };