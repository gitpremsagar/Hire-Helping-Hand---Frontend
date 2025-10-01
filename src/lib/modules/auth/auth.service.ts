import { API } from "@/lib/constants";
import customAxios from "@/lib/custom-axios-requests";
import { 
  signUpSchema, 
  loginSchema, 
  forgotPasswordSchema, 
  resetPasswordSchema,
  verifyEmailSchema,
  verifyPhoneSchema,
  setUserRoleSchema,
  updateUserRoleSchema,
  deleteUserRoleSchema
} from "./auth.schemas";
import {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
  SetUserRoleRequest,
  SetUserRoleResponse,
  UpdateUserRoleRequest,
  UpdateUserRoleResponse,
  DeleteUserRoleRequest,
  DeleteUserRoleResponse,
  GetRefreshedAccessTokenResponse,
} from "./auth.types";

// Auth service functions
export const authService = {
  getRefreshedAccessToken: async (): Promise<GetRefreshedAccessTokenResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.GET_REFRESHED_ACCESS_TOKEN);
      return response.data;
    } catch (error: any) {
      console.error("Get refreshed access token error:", error);
      throw new Error(error.response?.data?.message || "Get refreshed access token failed. Please try again.");
    }
  },

  signUp: async (data: SignUpRequest): Promise<SignUpResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.SIGNUP, data);
      return response.data;
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw new Error(error.response?.data?.message || "Sign up failed. Please try again.");
    }
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.LOGIN, data);
      return response.data;
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await customAxios.post(API.AUTH.LOGOUT);
      return response.data;
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.response?.data?.message || "Logout failed. Please try again.");
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.FORGOT_PASSWORD, data);
      return response.data;
    } catch (error: any) {
      console.error("Forgot password error:", error);
      throw new Error(error.response?.data?.message || "Failed to send reset email. Please try again.");
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.RESET_PASSWORD, data);
      return response.data;
    } catch (error: any) {
      console.error("Reset password error:", error);
      throw new Error(error.response?.data?.message || "Failed to reset password. Please try again.");
    }
  },

  verifyEmail: async (data: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.VERIFY_EMAIL, data);
      return response.data;
    } catch (error: any) {
      console.error("Verify email error:", error);
      throw new Error(error.response?.data?.message || "Email verification failed. Please try again.");
    }
  },

  verifyPhone: async (data: VerifyPhoneRequest): Promise<VerifyPhoneResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.VERIFY_PHONE, data);
      return response.data;
    } catch (error: any) {
      console.error("Verify phone error:", error);
      throw new Error(error.response?.data?.message || "Phone verification failed. Please try again.");
    }
  },

  addRoleToUser: async (data: SetUserRoleRequest): Promise<SetUserRoleResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.ADD_ROLE_TO_USER, data);
      return response.data;
    } catch (error: any) {
      console.error("Add role to user error:", error);
      throw new Error(error.response?.data?.message || "Failed to add role to user. Please try again.");
    }
  },

  removeRoleFromUser: async (data: DeleteUserRoleRequest): Promise<DeleteUserRoleResponse> => {
    try {
      const response = await customAxios.post(API.AUTH.REMOVE_ROLE_FROM_USER, data);
      return response.data;
    } catch (error: any) {
      console.error("Remove role from user error:", error);
      throw new Error(error.response?.data?.message || "Failed to remove role from user. Please try again.");
    }
  },
};
