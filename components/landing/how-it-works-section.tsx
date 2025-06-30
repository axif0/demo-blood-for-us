"use client"
import Image from "next/image"
import { Icons } from "../icons"

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9]"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#B83227]">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333333]">
              Simple Process, Powerful Impact
            </h2>
            <p className="max-w-[900px] text-[#777777] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes blood donation and requesting simple, secure,
              and efficient.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12 text-[#264653]">
            For Donors
          </h3>
          <div className="grid gap-6 lg:grid-cols-3">
            <ProcessCard
              number="1"
              title="Register & Verify"
              description="Sign up with your phone number, verify with OTP, and complete your donor profile."
            />
            <ProcessCard
              number="2"
              title="Receive Notifications"
              description="Get alerts about nearby blood requests matching your blood type."
            />
            <ProcessCard
              number="3"
              title="Donate & Track"
              description="Accept requests, donate blood, and track your donations and health records."
            />
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12 text-[#264653]">
            For Blood Seekers
          </h3>
          <div className="grid gap-6 lg:grid-cols-3">
            <ProcessCard
              number="1"
              title="Register Account"
              description="Create an account with your phone number and verify with OTP."
            />
            <ProcessCard
              number="2"
              title="Submit Request"
              description="Specify blood type, location, urgency level, and any special requirements."
            />
            <ProcessCard
              number="3"
              title="Connect with Donors"
              description="Get matched with nearby donors and coordinate the donation."
            />
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#264653]">
              Verified and Trusted
            </h3>
            <p className="text-[#777777]">
              All users on our platform go through a verification process to
              ensure safety and build trust within our community.
            </p>
            <ul className="space-y-2">
              <FeatureItem text="Admin verification of all donors and hospitals" />
              <FeatureItem text="Secure OTP-based authentication" />
              <FeatureItem text="Privacy controls for your personal information" />
              <FeatureItem text="Transparent donor recognition system" />
            </ul>
          </div>
          <div className="relative h-[300px] w-full">
            <Image
              src="/trusted.jpg?height=300&width=500"
              alt="Verification process"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B83227] text-white font-bold text-xl mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
      <p className="text-center text-[#777777]">{description}</p>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2">
      <Icons.checkCircle className="h-5 w-5 text-[#2A9D8F]" />
      <span>{text}</span>
    </li>
  )
}
