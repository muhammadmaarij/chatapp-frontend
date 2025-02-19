export interface SignupRequest {
    email: string;
    username: string;
    password: string;
    display_name?: string;
    avatar_url?: string;
    status?: string;
  }
  
  export interface UserResponse {
    id: string;
    email: string;
    username: string;
    display_name?: string;
    avatar_url?: string;
    status?: string;
    created_at: string;
  }
  
  export interface SignupResponse {
    message: string;
    user: UserResponse;
  }
  
  export interface SigninRequest {
    email: string;
    password: string;
  }
  
  export interface SigninResponse {
    token: string;
    user: UserResponse;
  }
  
  export interface VerifyEmailRequest {
    email: string;
    verification_code: string;
  }
  
  export interface VerifyEmailResponse {
    message: string;
  }

  export interface ApiError {
    message: string;
    statusCode: number;
    details?: string;
}
  


