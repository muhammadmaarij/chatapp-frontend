// src/services/authService.ts
import { SigninResponse, SignupResponse, VerifyEmailResponse } from "@/types/auth/interfaces";
import axiosInstance from "../axiosInstance";
import { baseUrl } from "../constants/baseUrl";


export const register = async (data: {
  email: string;
  password: string;
  display_name: string;
  username: string;
  avatar_url?: string;
  status?: string;
}): Promise<SignupResponse> => {
    console.log(data,"dada");
  const response = await axiosInstance.post(`${baseUrl}/api/auth/signup`, data);
  console.log(response,"Aaa");
  return response.data;
};

export const login = async (data: { email: string; password: string }): Promise<SigninResponse> => {
  const response = await axiosInstance.post(`${baseUrl}/api/auth/signin`, data);
  return response.data;
};


export const verifyEmail = async (data: {email: string; verification_code: string}): Promise<VerifyEmailResponse> => {
    const response = await axiosInstance.post(`${baseUrl}/api/auth/verify-email`, data)
    return response.data
};
