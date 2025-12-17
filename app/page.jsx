"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Fixed_Username = "super";
const Fixed_Password = "super@123";
export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isCorrectUsername = username === Fixed_Username;
  const isCorrectPassword = password === Fixed_Password;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === Fixed_Username && password === Fixed_Password) {
      toast.success("Login Successfully")
      router.push("/Home");
    } else {
      toast.error("Invalid username and Password")
    }
  }
  return (
    <div className="relative min-h-screen w-full">

      {/* Green Bar */}
      <div className="w-full bg-primary text-cardbackground text-center py-1 font-semibold">
        Where real-time data becomes real-world decisions.
      </div>

      {/* White Header with Logo */}
      <div className="w-full bg-white py-2 flex items-center">
        <div className="ml-6 bg-[#f2eef4] rounded-[20px] px-1 py-1 shadow-md flex items-center">
          <img src="/logo.png" alt="JWR Logo" className="h-12" />
        </div>
      </div>

      {/* Background Section */}
      <div className="relative w-full min-h-[calc(100vh-104px)]">
        <img
          src="/Background.jpg"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Centered Card */}
        <div className="relative z-10 w-full min-h-[calc(100vh-104px)] flex justify-center items-center shadow-md">
          <div className="bg-[#fdffff] border border-[#e0e3e5] w-[300px] h-[380px] rounded-3xl shadow-md">
            <div className="w-full flex justify-center mb-4 pt-7">
              <img src="/logo.png" alt="logo" className="h-10 mr-4" />
            </div>

            {/* */}
            <h2 className="text-xl font-bold text-center tracking-[2px] -mt-2 mb-8">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin}>
              <div className="w-full px-6 -mt-2">
                {/* Username */}
                <label className="text-sm font-bold text-[#1f1f1f]">User Name</label>
                <input
                  type="text"
                  placeholder="Your User Name"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full mt-1 mb-5 px-4 py-2 rounded-full bg-[#eeebf0] 
                  text-sm focus:outline-none text-[#0f1010] placeholder:font-bold
                  ${isCorrectUsername ? "font-bold" : ""}`}
                />
                {/* Password */}
                <label className="text-sm font-bold text-[#1f1f1f]">Password</label>
                <input
                  type="password"
                  placeholder="Your Password"
                  autoCorrect="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full mt-1 mb-5 px-4 py-2 rounded-full bg-[#eeebf0] 
                  text-sm focus:outline-none text-[#0f1010] placeholder:font-bold
                  ${isCorrectPassword ? "font-bold" : ""}`}
                />
              </div>
              <Button
                type="submit"
                className="w-[calc(100%-50px)] ml-5 py-2 rounded-full bg-primary text-background font-bold text-lg mt-2 hover:scale-95 duration-300 cursor-pointer">
                Login
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
