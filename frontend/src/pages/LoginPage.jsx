
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };


  // Track focus for floating label
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-base-200/80 via-base-100/90 to-base-200/80 dark:from-base-300/90 dark:via-base-200/90 dark:to-base-300/90 transition-colors duration-500">
      <div className="w-full max-w-2xl flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden border border-base-200/70 bg-base-200/70 dark:bg-base-200/50 backdrop-blur-2xl backdrop-saturate-200 animate-fade-in-up hover:scale-[1.015] hover:shadow-2xl hover:shadow-primary/30 transition-transform duration-300">
        {/* Left Side - Form */}
        <div className="flex-1 flex flex-col justify-center p-10 bg-base-100/80 dark:bg-base-100/60">
          <div className="w-full max-w-sm mx-auto space-y-10">
            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-base-content mb-2 tracking-tight">Sign in</h1>
              <p className="text-base-content/70 text-base">Welcome back! Please enter your details.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Email and Password Fields Aligned */}
              <div className="flex flex-col gap-5">
                {/* Email Field with Floating Label */}
                <div className="relative">
                  <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                    <Mail className="h-6 w-6 text-base-content/70" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className="peer block w-full rounded-3xl border border-base-200/70 bg-base-100/70 dark:bg-base-200/40 pt-7 pb-2 pl-12 pr-3 text-base-content font-sans font-medium placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/80 focus:shadow-lg focus:shadow-primary/10 backdrop-blur-md transition-all duration-200 shadow-sm"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="username"
                    required
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-12 px-2 font-sans font-semibold transition-all duration-200 pointer-events-none bg-base-100/80 dark:bg-base-200/60 backdrop-blur-md rounded-md
                      ${emailFocused || formData.email
                        ? 'top-1.5 text-xs text-primary/90 shadow-md shadow-primary/10'
                        : 'top-1/2 -translate-y-1/2 text-base-content/50 text-base'}
                    `}
                    style={{zIndex:2}}
                  >
                    Email
                  </label>
                </div>
                {/* Password Field with Floating Label */}
                <div className="relative">
                  <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center pointer-events-none">
                    <Lock className="h-6 w-6 text-base-content/70" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="peer block w-full rounded-3xl border border-base-200/70 bg-base-100/70 dark:bg-base-200/40 pt-7 pb-2 pl-12 pr-12 text-base-content font-sans font-medium placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/80 focus:shadow-lg focus:shadow-primary/10 backdrop-blur-md transition-all duration-200 shadow-sm"
                    placeholder=" "
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    autoComplete="current-password"
                    required
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-12 px-2 font-sans font-semibold transition-all duration-200 pointer-events-none bg-base-100/80 dark:bg-base-200/60 backdrop-blur-md rounded-md
                      ${passwordFocused || formData.password
                        ? 'top-1.5 text-xs text-primary/90 shadow-md shadow-primary/10'
                        : 'top-1/2 -translate-y-1/2 text-base-content/50 text-base'}
                    `}
                    style={{zIndex:2}}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6 text-base-content/70" />
                    ) : (
                      <Eye className="h-6 w-6 text-base-content/70" />
                    )}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/20 focus:ring-2 focus:ring-primary/40 focus:outline-none text-base" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-base-content/70 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline font-semibold text-primary hover:text-primary/80">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Right Side - Illustration or Accent */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-base-200/0">
          <div className="w-4/5 h-4/5 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-base-200/60 flex items-center justify-center shadow-xl shadow-primary/10 relative overflow-hidden">
            <span className="text-7xl text-primary font-black select-none drop-shadow-lg animate-bounce-slow z-10">💬</span>
            {/* Dynamic accent blobs */}
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-70 animate-float-blob" />
            <span className="absolute -bottom-8 -right-8 w-28 h-28 bg-primary/10 rounded-full blur-2xl opacity-60 animate-float-blob2" />
          </div>
        </div>
      </div>
      {/* Animation keyframes for fade-in-up, bounce, and blobs */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite; }
        @keyframes float-blob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .animate-float-blob { animation: float-blob 4s ease-in-out infinite; }
        @keyframes float-blob2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(10px) scale(1.08); }
        }
        .animate-float-blob2 { animation: float-blob2 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
export default LoginPage;
