import { AuthForms } from "@/app/components/auth/AuthForms";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <AuthForms defaultView="signin" />
      </div>
    </div>
  );
}
