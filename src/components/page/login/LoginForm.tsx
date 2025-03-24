"use client"

import type React from "react"

import { useState } from "react"
import InputField from "./InputField"
import PasswordInput from "./PasswordInput"
import SocialLoginButton from "./SocialLoginButton"
import Divider from "./Divider"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })
  }

  return (
    <>
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Login to your account</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="balamia@gmail.com"
          required
        />

        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          forgotPasswordLink="#"
          required
        />

        <button
          type="submit"
          className="w-full rounded-[10px] bg-black py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none"
        >
          Login now
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-500">
        Don't Have An Account?
        <Link to="/register" className="ml-1 font-medium text-blue-600 hover:text-blue-500">
          Sign Up
        </Link>
      </div>

      <Divider text="Or" />

      <div className="mt-6 grid grid-cols-2 gap-3">
        <SocialLoginButton
          icon={<FcGoogle className="mr-2 h-5 w-5" />}
          text="Google"
          onClick={() => console.log("Google login")}
        />
        <SocialLoginButton
          icon={<FaFacebook className="mr-2 h-5 w-5 text-blue-600" />}
          text="Facebook"
          onClick={() => console.log("Facebook login")}
        />
      </div>
    </>
  )
}

export default LoginForm

