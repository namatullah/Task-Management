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
