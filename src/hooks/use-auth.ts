import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService, type LoginRequest, type SignupRequest, type SocialLoginRequest } from "@/lib/api/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("Welcome back!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    },
  });

  const signupMutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("Account created successfully!");
      navigate("/email-verification");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    },
  });

  const socialLoginMutation = useMutation({
    mutationFn: authService.socialLogin,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Social login failed. Please try again.");
    },
  });

  const ssoLoginMutation = useMutation({
    mutationFn: authService.ssoLogin,
    onSuccess: (data) => {
      window.location.href = data.redirectUrl;
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "SSO login failed. Please try again.");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send reset email. Please try again.");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authService.resetPassword(token, password),
    onSuccess: () => {
      toast.success("Password reset successfully!");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Password reset failed. Please try again.");
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: () => {
      toast.success("Email verified successfully!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Email verification failed. Please try again.");
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: authService.resendVerification,
    onSuccess: () => {
      toast.success("Verification email sent!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to send verification email. Please try again.");
    },
  });

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupRequest) => {
    setIsLoading(true);
    try {
      await signupMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (data: SocialLoginRequest) => {
    setIsLoading(true);
    try {
      await socialLoginMutation.mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  };

  const ssoLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      await ssoLoginMutation.mutateAsync(provider);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await forgotPasswordMutation.mutateAsync(email);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      await resetPasswordMutation.mutateAsync({ token, password });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    try {
      await verifyEmailMutation.mutateAsync(token);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    setIsLoading(true);
    try {
      await resendVerificationMutation.mutateAsync(email);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    login,
    signup,
    socialLogin,
    ssoLogin,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    isSocialLoginLoading: socialLoginMutation.isPending,
    isSSOLoading: ssoLoginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isForgotPasswordLoading: forgotPasswordMutation.isPending,
    isResetPasswordLoading: resetPasswordMutation.isPending,
    isVerifyEmailLoading: verifyEmailMutation.isPending,
    isResendVerificationLoading: resendVerificationMutation.isPending,
  };
};