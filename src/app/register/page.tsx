"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";


function Register() {
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    console.log(name, email, password);
    if (!isValidEmail(email)) {
      setError("Email is Invalid");
    }

    if (!password || password.length < 8) {
      setError("Password is Invalid");
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      } if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if(sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }
  return (
    sessionStatus !=="authenticated" && ( <div className="flex min-h-screen flex-col justify-between p-24 items-center">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8 text-white">
          Register
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Enter Your Password"
              required
            />
          </div>
          {/* button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              SignUp
            </button>
          </div>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <p className="text-center text-gray-400">
          Already have a account?{" "}
          <Link
            href="/login"
            className="block text-center text-blue-500 hover:underline mt-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    )
  );
}

export default Register;
