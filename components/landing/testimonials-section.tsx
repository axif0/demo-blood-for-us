"use client"
import Image from "next/image"
import { Icons } from "../icons"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#F9F9F9] px-3 py-1 text-sm text-[#B83227]">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333333]">
              Stories of Impact
            </h2>
            <p className="max-w-[900px] text-[#777777] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from donors and recipients who have experienced the
              difference Blood For Us makes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="Blood For Us helped me find a donor within minutes when my father needed emergency surgery. I'm forever grateful."
            name="Rahima Begum"
            role="Blood Recipient"
            image="/rahima.png?height=100&width=100"
          />
          <TestimonialCard
            quote="As a regular donor, the platform makes it easy to track my donations and health records. The recognition system keeps me motivated."
            name="Kamal Hossain"
            role="Regular Donor"
            image="/kamal.png?height=100&width=100"
          />
          <TestimonialCard
            quote="Our hospital has seen a 40% increase in blood availability since partnering with Blood For Us. The verification system ensures quality donors."
            name="Dr. Fatima Ahmed"
            role="Hospital Partner"
            image="/drfatima.jpg?height=100&width=100"
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string
  name: string
  role: string
  image: string
}) {
  return (
    <div className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white">
      <Icons.quote className="h-8 w-8 text-[#B83227] opacity-50" />
      <p className="text-[#333333]">{quote}</p>
      <div className="flex items-center gap-4 pt-4 border-t">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-[#333333]">{name}</h4>
          <p className="text-sm text-[#777777]">{role}</p>
        </div>
      </div>
    </div>
  )
}
