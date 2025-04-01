"use client";

import { useSession } from "@/lib/auth-client";
import { SignOutButton } from "./SignOutButton";

export function UserProfile() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="p-4 text-center">Loading user profile...</div>;
  }

  if (!session) {
    return <div className="p-4 text-center">Not signed in</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center gap-4">
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h3 className="font-medium">{session.user.name || "User"}</h3>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      <div className="mt-4">
        <SignOutButton className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100" />
      </div>
    </div>
  );
}
