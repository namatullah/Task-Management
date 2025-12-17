"use client";

import MainDrawer from "@/components/layout/MainDrawer";
import MainDrawerHeader from "@/components/layout/MainDrawerHeader";
import { useAuth } from "@/hooks/AuthContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null; // or a spinner
  }

  if (!isAuthenticated) {
    return null; // prevent UI flash
  }

  return (
    <Box sx={{ display: "flex" }}>
      <MainDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0 }}>
        <MainDrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
