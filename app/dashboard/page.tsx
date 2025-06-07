"use client";

import { useSession } from "@/lib/auth-client";
import { UserProfile } from "@/app/components/auth/UserProfile";
import { AnimationForm } from "@/components/AnimationForm";
import { AnimationPreview } from "@/components/AnimationPreview";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // This won't render on the client if the useEffect redirects
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Animation Studio
            </h1>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Left Side - Animation Form */}
          <div className="flex flex-col">
            <AnimationForm />
          </div>

          {/* Right Side - Animation Preview */}
          <div className="flex flex-col">
            <AnimationPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
