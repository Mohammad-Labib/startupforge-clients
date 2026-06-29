"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Link } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole, Camera } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { RadioGroup, Radio, Label, selected } from "@heroui/react";

export default function RegisterPage() {
    const router = useRouter();

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [role, setRole] = useState("founder")

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);


    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return; 
        }

      
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter (A-Z).");
            return;
        }

      
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter (a-z).");
            return;
        }

        setIsLoading(true);

        try {
       
            const res = await signUp.email({
                email: email.trim(),
                password: password,
                name: name.trim(),
                image: image || undefined,
                role,
                callbackURL: "/",

            });

            if (res?.error) {
                setError(res.error.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Redirecting...");

             
                setName("");
                setEmail("");
                setPassword("");
                setImage(null);

        
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            }
        } catch (err) {
            console.error("Signup Client Error:", err);
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-8">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSignup} className="flex flex-col gap-5">

                    {/* Image Upload Field */}
                    <div className="flex flex-col items-center justify-center gap-3 mb-2">
                        <label className="relative flex items-center justify-center w-24 h-24 rounded-full border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 cursor-pointer overflow-hidden group hover:border-zinc-400 transition-colors">
                            {image ? (
                                <img src={image} alt="Avatar preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-zinc-400 group-hover:text-zinc-500">
                                    <Camera size={24} />
                                    <span className="text-[10px] mt-1 font-medium">Upload</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Profile Picture (Optional)</span>
                    </div>

                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                        <div className="relative flex items-center">
                            <Person className="absolute left-3 text-zinc-400 pointer-events-none" size={16} />
                            <input
                                required
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
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
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                        <div className="relative flex items-center">
                            <ShieldKeyhole className="absolute left-3 text-zinc-400 pointer-events-none" size={16} />
                            <input
                                required
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password (min 6 characters)"
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

                    {/* redio session  */}
                    <RadioGroup onChange={value => setRole(value)} orientation="horizontal">
                        <Radio selected value="founder" defaultValue="founder"
                            name="role"
                        >
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                Founder
                            </Radio.Content>
                        </Radio>
                        <Radio value="collaborator">
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                Collaborator
                            </Radio.Content>
                        </Radio>
                    </RadioGroup>


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
                        Register now
                    </Button>

                    {/* Navigation Option */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium cursor-pointer text-sm text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-zinc-700 dark:hover:text-zinc-300">
                            Login here
                        </Link>
                    </div>

                </form>
            </Card>
        </div>
    );
}