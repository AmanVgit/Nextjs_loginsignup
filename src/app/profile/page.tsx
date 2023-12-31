"use client"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            console.log("Successfully logged out");
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="select-none text-2xl font-semibold mb-4">All Profile page</h1>
            <h2 className="select-none p-1 mb-3 rounded cursor-pointer bg-green-500 hover:bg-green-700 ">
                {data === 'nothing' ? "Click on Get User to get user ID" :
                    <Link
                        href={`/profile/${data}`}>{data}
                    </Link>}
            </h2>
            <button
                onClick={logout}
                className="select-none 
                         bg-blue-500 
                         hover:bg-blue-700 
                         text-white 
                           font-bold 
                           py-2 
                           px-4 
                           rounded">Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-purple-500 
                             mt-3
                             select-none 
                           hover:bg-purple-700 
                           text-white 
                             font-bold 
                             py-2 
                             px-4 
                             rounded">Get User
            </button>
        </div>
    )
}