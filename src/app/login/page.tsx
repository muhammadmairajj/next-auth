"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import styles from "../styles/Form.module.css";

function Login() {
  const router = useRouter();
  const [error, setError] = useState<any>("");
  // const session = useSession();
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
    // console.log(e.target);
    const email = e.target[0].value;
    const password = e.target[1].value;

    // console.log(email, password);
    if (!isValidEmail(email)) {
      setError("Email is Invalid");
    }

    if (!password || password.length < 8) {
      setError("Password is Invalid");
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid Email or Password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleGithubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  if(sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }

  return (
    sessionStatus !=="authenticated" && (<div className="flex min-h-screen flex-col justify-between p-24 items-center">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8 text-white">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image
                src={"/assets/google.svg"}
                width="20"
                height={20}
                alt="Google image"
              ></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGithubSignin}
            >
              Sign In with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="Github image"
              ></Image>
            </button>
          </div>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="block text-center text-blue-500 hover:underline mt-2"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
    )
  );
}

export default Login;
