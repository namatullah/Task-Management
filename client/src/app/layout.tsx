import MainDrawer from "@/components/layout/MainDrawer";
import MainDrawerHeader from "@/components/layout/MainDrawerHeader";
import { AuthProvider } from "@/hooks/AuthContext";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = {
  title: "Task Management",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppRouterCacheProvider>
            <Box sx={{ display: "flex" }}>
              <MainDrawer />
              <Box component="main" sx={{ flexGrow: 1, p: 0, mt: 1 }}>
                <MainDrawerHeader />
                {children}
              </Box>
            </Box>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
