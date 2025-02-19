import { UserResponse } from "../auth/interfaces";

export interface GetProfileResponse {
    user: UserResponse;
  }
  
  export interface GetAllUsersResponse {
    users: UserResponse[];
  }