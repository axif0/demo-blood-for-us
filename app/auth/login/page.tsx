"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send the OTP to the phone number
    console.log("Sending OTP to", phoneNumber)
    setStep("otp")
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would verify the OTP
    console.log("Verifying OTP", otp)
    // Redirect to dashboard on success
    window.location.href = "/dashboard"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] p-4">
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center text-sm font-medium text-[#777777] hover:text-[#B83227]"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-[#333333]">Login</CardTitle>
          <CardDescription className="text-center text-[#777777]">
            {step === "phone" ? "Enter your phone number to receive an OTP" : "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+880 1234 567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white">
                Verify OTP
              </Button>
              <Button type="button" variant="link" className="w-full text-[#264653]" onClick={() => setStep("phone")}>
                Change Phone Number
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-[#777777]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-[#B83227] hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
