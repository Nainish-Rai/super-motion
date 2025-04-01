"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SignOutButtonProps {
  className?: string;
  redirectUrl?: string;
  children?: React.ReactNode;
}

export function SignOutButton({
  className = "",
  redirectUrl = "/login",
  children = "Sign out",
}: SignOutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(redirectUrl);
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading} className={className}>
      {isLoading ? "Signing out..." : children}
    </button>
  );
}
