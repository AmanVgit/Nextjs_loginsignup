"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function loginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-semibold mb-4">{loading ? "Processing" : "Login"}</h1>

            <div className="flex flex-col space-y-2">


                {/* email Field */}
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
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

                {/* Signin Button */}
                <button
                    onClick={onLogin}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Login
                </button>
                <Link href="/signup" className="text-white-500 hover:underline hover:animate-pulse">Create an account?</Link>
            </div>
        </div>
    );
}
