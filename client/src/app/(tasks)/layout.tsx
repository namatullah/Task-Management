"use client";
import MainDrawer from "@/components/layout/MainDrawer";
import MainDrawerHeader from "@/components/layout/MainDrawerHeader";
import { Box } from "@mui/material";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
