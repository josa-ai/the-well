import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login — The Well",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--color-text)] tracking-tight">
            The Well
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Admin Dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
