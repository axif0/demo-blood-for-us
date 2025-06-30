"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LeaderboardSection() {
  const topDonors = [
    {
      rank: 1,
      name: "Rahim Ahmed",
      donations: 24,
      points: 1250,
      bloodType: "O+",
      avatar: "/rahim.jpg?height=80&width=80",
    },
    {
      rank: 2,
      name: "Fatima Khan",
      donations: 20,
      points: 1100,
      bloodType: "A+",
      avatar: "/fatima.jpg?height=80&width=80",
    },
    {
      rank: 3,
      name: "Jamal Uddin",
      donations: 18,
      points: 980,
      bloodType: "B+",
      avatar: "/jamal.jpg?height=80&width=80",
    },
  ]

  return (
    <section id="leaderboard" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-[#F9F9F9] px-3 py-1 text-sm text-[#B83227]">
              Leaderboard
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#333333]">
              Our Top Donors
            </h2>
            <p className="max-w-[900px] text-[#777777] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Recognizing the heroes who save lives through blood donation
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {topDonors.map((donor) => (
            <div
              key={donor.rank}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md bg-white relative"
            >
              <div
                className={`absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full ${
                  donor.rank === 1
                    ? "bg-yellow-500"
                    : donor.rank === 2
                    ? "bg-gray-400"
                    : donor.rank === 3
                    ? "bg-amber-700"
                    : "bg-[#264653]"
                } text-white font-bold text-lg`}
              >
                {donor.rank}
              </div>
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#B83227]">
                <Image
                  src={donor.avatar || "/placeholder.svg"}
                  alt={donor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#333333]">
                  {donor.name}
                </h3>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <Badge className="bg-[#B83227]">{donor.bloodType}</Badge>
                  <Badge className="bg-[#2A9D8F]">Free Donor</Badge>
                </div>
                <p className="mt-2 text-[#777777]">
                  {donor.donations} donations
                </p>
                <p className="font-medium text-[#264653]">
                  {donor.points} points
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            className="bg-[#264653] hover:bg-[#1e3a45] text-white"
            size="lg"
            asChild
          >
            <Link href="/leaderboard">View Full Leaderboard</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
