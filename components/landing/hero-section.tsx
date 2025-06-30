"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F9F9F9]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-[#333333]">
                Your Blood, Their Hope{" "}
                <span className="text-[#B83227]">Become a Hero Today</span>
              </h1>
              <p className="max-w-[600px] text-[#777777] md:text-xl">
                Connect with blood seekers in your area, track your donations,
                and become part of a life-saving community across Bangladesh.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                className="bg-[#B83227] hover:bg-[#a12a22] text-white"
                size="lg"
                asChild
              >
                <Link href="/auth/register?role=donor">Join as Donor</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard/requests/create">Request Blood</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#777777]">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#2A9D8F]" />
                <span>10,000+ Donors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-[#2A9D8F]" />
                <span>5,000+ Lives Saved</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[400px] lg:h-[500px]">
              <Image
                src="/transfusion.jpg?height=500&width=500"
                alt="Blood donation illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
