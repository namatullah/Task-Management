import { AuthProvider } from "@/hooks/AuthContext";
import { ThemeContextProvider } from "@/hooks/ThemeContext";
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
          <ThemeContextProvider>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
