"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-semibold mb-4">{loading ? "Processing" : "Signup"}</h1>

            <div className="flex flex-col space-y-2">
                {/* Email Field */}
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    autoComplete="off"
                    className="p-2 border rounded-md text-black"
                />

                {/* Username Field */}
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    autoComplete="off"
                    className="p-2 border rounded-md  text-black"
                />

                {/* Password Field */}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    autoComplete="off"
                    placeholder="Password"
                    className="p-2 border rounded-md  text-black"
                />

                {/* Signup Button */}
                <button
                    onClick={onSignup}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>
                <Link href="/login" className="text-white-500 hover:underline hover:animate-pulse">Already have an account?</Link>
            </div>
        </div>
    );
}
