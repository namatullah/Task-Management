import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/components/layout/contexts/AuthContext";
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
      <body style={{ margin: 0 }}>
        <AuthProvider>
          <Navbar />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
