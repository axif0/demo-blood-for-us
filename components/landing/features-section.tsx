"use client"
import type React from "react"
import { Icons } from "../icons"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#F9F9F9] px-3 py-1 text-sm text-[#B83227]">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333333]">
              Why Choose Blood For Us
            </h2>
            <p className="max-w-[900px] text-[#777777] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform connects blood donors with those in need through an
              intuitive, secure, and rewarding experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <FeatureCard
            icon={<Icons.clock className="h-10 w-10 text-[#B83227]" />}
            title="Quick Matching"
            description="Find nearby blood donors or requests in minutes with our intelligent matching system."
          />
          <FeatureCard
            icon={<Icons.award className="h-10 w-10 text-[#B83227]" />}
            title="Donor Recognition"
            description="Earn badges, points, and recognition on our leaderboard for your life-saving donations."
          />
          <FeatureCard
            icon={<Icons.mapPin className="h-10 w-10 text-[#B83227]" />}
            title="Geo-Targeted Alerts"
            description="Receive notifications about blood requests in your area based on your blood type."
          />
          <FeatureCard
            icon={<Icons.activity className="h-10 w-10 text-[#B83227]" />}
            title="Health Records"
            description="Access and manage your donation-related health reports and medical documents."
          />
          <FeatureCard
            icon={<Icons.shield className="h-10 w-10 text-[#B83227]" />}
            title="Verified Users"
            description="All donors and hospitals are verified to ensure safety and trust within our community."
          />
          <FeatureCard
            icon={<Icons.heart className="h-10 w-10 text-[#B83227]" />}
            title="Emergency Response"
            description="Critical blood requests are prioritized with expanded notification reach."
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white">
      <div className="mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-[#333333]">{title}</h3>
      <p className="text-center text-[#777777]">{description}</p>
    </div>
  )
}
