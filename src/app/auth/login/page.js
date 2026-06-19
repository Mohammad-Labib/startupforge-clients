"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client"; // better-auth এর signIn মেথড ইমপোর্ট করা হলো

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
            // better-auth এর signIn মেthod ব্যবহার করে লগইন হ্যান্ডেলিং
            const res = await signIn.email({
                email: email.trim(),
                password: password,
                callbackURL: "/", // লগইন সফল হলে রিডাইরেক্ট পাথ
            });

            if (res?.error) {
                // পাসওয়ার্ড বা ইমেইল ভুল হলে সার্ভারের পাঠানো মেসেজ দেখাবে
                setError(res.error.message || "Invalid email or password.");
            } else {
                setSuccess("Logged in successfully! Welcome back.");
                setEmail("");
                setPassword("");

                // ২ সেকেন্ড পর হোম পেজে রিডাইরেক্ট
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
                    <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                            <At className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password" className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</Label>
                            {/* ফোরগট পাসওয়ার্ড অপশন (প্রয়োজন হলে রাখতে পারেন) */}
                            <Link href="/forgot-password" className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline">
                                Forgot password?
                            </Link>
                        </div>
                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-zinc-400 dark:focus-within:border-zinc-600 transition-colors">
                            <ShieldKeyhole className="text-zinc-400 pointer-events-none" size={16} />
                            <Input
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                            <button
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

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
                        color="primary"
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