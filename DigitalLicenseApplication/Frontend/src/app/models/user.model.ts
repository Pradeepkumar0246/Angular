export interface User {
  userId: number;
  name: string;
  email: string;
  password?: string;
  profileImage?: string | null; // stored as base64 string from backend
  profileImageUrl?: string;      // used for preview in frontend
  role: string;
  contactNumber: string;
  departmentId?: number | null;
  department?: any | null;
  applications?: any[];
}

export interface UserLoginModel {
  email: string;
  password: string;
}
export interface LoginResponseModel {
  token: string;
  user: User;
}
export interface UserRegisterModel {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
}
