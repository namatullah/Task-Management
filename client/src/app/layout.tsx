import { AuthProvider } from "@/hooks/AuthContext";
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
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
