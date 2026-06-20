"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Link } from "@heroui/react"; 
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client"; 

export default function LoginPage() {
    const router = useRouter();

    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const res = await signIn.email({
                email: email.trim(),
                password: password,
                callbackURL: "/", 
            });

            if (res?.error) {
                setError(res.error.message || "Invalid email or password.");
            } else {
                setSuccess("Logged in successfully! Welcome back.");
                setEmail("");
                setPassword("");

                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (err) {
            console.error("Login Client Error:", err);
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Welcome back</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter your credentials to access your account</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleLogin} className="flex flex-col gap-5">

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Email Address
                        </label>
                        {/* Custom Input Wrapper for Icon */}
                        <div className="relative flex items-center">
                            <At className="absolute left-3 text-zinc-400 pointer-events-none" size={16} />
                            <input
                                required
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Password
                            </label>
                            <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline">
                                Forgot password?
                            </Link>
                        </div>
                        {/* Custom Input Wrapper for Password Icons */}
                        <div className="relative flex items-center">
                            <ShieldKeyhole className="absolute left-3 text-zinc-400 pointer-events-none" size={16} />
                            <input
                                required
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                            />
                            <button
                                className="absolute right-3 focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Dynamic Status Badges */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}

                    {/* Action Button */}
                    <Button
                        type="submit"
                        className="w-full font-semibold rounded-xl text-sm h-12 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-black transition-colors"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Don t have an account?{" "}
                        <Link href="/register" className="font-medium cursor-pointer text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300">
                            Register here
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}