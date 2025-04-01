"use client";

import { useSession } from "@/lib/auth-client";
import { UserProfile } from "@/app/components/auth/UserProfile";
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1">
            <UserProfile />
          </div>

          <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Welcome, {session.user.name || "User"}!
            </h2>
            <p className="text-gray-600">
              You are now signed in to the application. This is a protected
              route that only authenticated users can access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
