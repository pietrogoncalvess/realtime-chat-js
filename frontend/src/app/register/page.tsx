import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a2e] via-[#1a0a3e] to-[#8b0a8b]" />

      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-white/30 via-transparent to-transparent blur-3xl" />

      <RegisterForm />
    </div>
  );
}
