"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  LoginFormType,
  RegisterFormType,
  User,
} from "@/components/types/users";
import { me, signOut, signin, signup } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    credentials: LoginFormType
  ) => Promise<{ success: boolean; data?: User; error?: string }>;
  register: (
    userData: RegisterFormType
  ) => Promise<{ success: boolean; data?: User; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}
// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await me();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginFormType) => {
    try {
      const response = await signin(credentials);
      const userData = response.data.user;
      console.log("LOG: ", userData);
      setUser(userData);
      router.push("/");
      return { success: true, data: userData };
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed";
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData: RegisterFormType) => {
    try {
      const response = await signup(userData);
      const newUser = response.data.user;
      console.log("REG: ", newUser);
      setUser(newUser);
      router.push("/");
      return { success: true, data: newUser };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      setUser(null);
      router.push("/auth");
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
    checkAuthStatus,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// Custom hook with better error message
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Make sure you have wrapped your app with <AuthProvider> layout.tsx"
    );
  }
  return context;
};
