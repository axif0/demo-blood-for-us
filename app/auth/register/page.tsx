"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") || "donor"
  const defaultType = defaultRole === "hospital" ? "hospital" : "individual"

  const [step, setStep] = useState<"type" | "info" | "phone" | "otp">("type")
  const [accountType, setAccountType] = useState<"individual" | "hospital">(defaultType as any)
  const [role, setRole] = useState<"donor" | "seeker">(defaultRole === "seeker" ? "seeker" : "donor")
  const [name, setName] = useState("")
  const [hospitalName, setHospitalName] = useState("")
  const [hospitalId, setHospitalId] = useState("")
  const [bloodGroup, setBloodGroup] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const handleTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("info")
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("phone")
  }

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would send the OTP to the phone number
    console.log("Sending OTP to", phoneNumber)
    setStep("otp")
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would verify the OTP and create the account
    console.log("Verifying OTP", otp)
    if (accountType === "individual") {
      console.log("Creating individual account for", { name, role, bloodGroup, phoneNumber })
      // Redirect to donor/seeker dashboard on success
      window.location.href = "/dashboard"
    } else {
      console.log("Creating hospital account for", { hospitalName, hospitalId, phoneNumber })
      // Redirect to hospital dashboard on success
      window.location.href = "/hospital-dashboard"
    }
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
          <CardTitle className="text-2xl font-bold text-center text-[#333333]">Create an Account</CardTitle>
          <CardDescription className="text-center text-[#777777]">
            {step === "type" && "Select your account type to get started"}
            {step === "info" && "Enter your information to continue"}
            {step === "phone" && "Enter your phone number to receive an OTP"}
            {step === "otp" && "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "type" && (
            <form onSubmit={handleTypeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Tabs
                  defaultValue={accountType}
                  className="w-full"
                  onValueChange={(value) => setAccountType(value as "individual" | "hospital")}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="individual">Individual</TabsTrigger>
                    <TabsTrigger value="hospital">Hospital</TabsTrigger>
                  </TabsList>
                  <TabsContent value="individual" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">I want to</Label>
                      <RadioGroup
                        id="role"
                        value={role}
                        onValueChange={(value) => setRole(value as any)}
                        className="flex space-x-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="donor" id="donor" />
                          <Label htmlFor="donor">Donate Blood</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="seeker" id="seeker" />
                          <Label htmlFor="seeker">Request Blood</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>
                  <TabsContent value="hospital" className="mt-4 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Register as a hospital to manage blood requests and connect with donors.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <Button type="submit" className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white">
                Continue
              </Button>
            </form>
          )}

          {step === "info" && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              {accountType === "individual" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {role === "donor" && (
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={bloodGroup} onValueChange={setBloodGroup} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      placeholder="Enter hospital name"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalId">Hospital Registration ID</Label>
                    <Input
                      id="hospitalId"
                      placeholder="Enter hospital registration ID"
                      value={hospitalId}
                      onChange={(e) => setHospitalId(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white">
                Continue
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep("type")}>
                Back
              </Button>
            </form>
          )}

          {step === "phone" && (
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
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep("info")}>
                Back
              </Button>
            </form>
          )}

          {step === "otp" && (
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
                Create Account
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep("phone")}>
                Back
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm text-[#777777]">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#B83227] hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
