"use client";

import { me } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfFound: boolean;
}

export function useAuth1(optons?: UseAuthOptions) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await me();
        console.log(res.data)
        setUser(res.data);
        if (optons?.redirectIfFound && optons.redirectTo) {
          router.push(optons.redirectTo);
        }
      } catch (err) {
        setUser(null);
        if (optons?.redirectTo && !optons.redirectIfFound) {
          router.push(optons.redirectTo);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [optons?.redirectTo, optons?.redirectIfFound, router]);

  return { user, loading };
}
