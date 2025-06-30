"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const leaderboardData = [
  {
    rank: 1,
    name: "Rahim Ahmed",
    donations: 24,
    points: 1250,
    bloodType: "O+",
    location: "Dhaka",
    avatar: "/rahim.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 2,
    name: "Fatima Khan",
    donations: 20,
    points: 1100,
    bloodType: "A+",
    location: "Chattogram",
    avatar: "/fatima.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 3,
    name: "Jamal Uddin",
    donations: 18,
    points: 980,
    bloodType: "B+",
    location: "Sylhet",
    avatar: "/jamal.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 4,
    name: "Nusrat Jahan",
    donations: 15,
    points: 850,
    bloodType: "AB+",
    location: "Dhaka",
    avatar: "/rahima.png?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 5,
    name: "Masud Rana",
    donations: 14,
    points: 780,
    bloodType: "A-",
    location: "Khulna",
    avatar: "/kamal.png?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 6,
    name: "Sadia Islam",
    donations: 12,
    points: 720,
    bloodType: "B-",
    location: "Rajshahi",
    avatar: "/drfatima.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 7,
    name: "Arif Hossain",
    donations: 11,
    points: 650,
    bloodType: "0+",
    location: "Mymensingh",
    avatar: "/arif.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 8,
    name: "Tahmina Akter",
    donations: 10,
    points: 600,
    bloodType: "AB-",
    location: "Rangpur",
    avatar: "/tahmina.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 9,
    name: "Rafiq Islam",
    donations: 9,
    points: 520,
    bloodType: "B+",
    location: "Barisal",
    avatar: "/rafiq.png?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 10,
    name: "Nasrin Begum",
    donations: 9,
    points: 500,
    bloodType: "AB-",
    location: "Cumilla",
    avatar: "/nasrin.jpg?height=40&width=40",
    isCurrentUser: false,
  },
  {
    rank: 42,
    name: "Kamal Hossain",
    donations: 8,
    points: 350,
    bloodType: "A+",
    location: "Gazipur",
    avatar: "/kamal.png?height=40&width=40",
    isCurrentUser: true,
  },
]

export default function Leaderboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#264653]">
            Blood Donor Leaderboard
          </h1>
          <p className="text-muted-foreground">
            Recognizing the heroes who save lives through blood donation
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter Leaderboard</CardTitle>
            <CardDescription>
              View top donors by location, blood type, and time period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Bangladesh</SelectItem>
                    <SelectItem value="dhaka">Dhaka Division</SelectItem>
                    <SelectItem value="chittagong">
                      Chittagong Division
                    </SelectItem>
                    <SelectItem value="rajshahi">Rajshahi Division</SelectItem>
                    <SelectItem value="khulna">Khulna Division</SelectItem>
                    <SelectItem value="barisal">Barisal Division</SelectItem>
                    <SelectItem value="sylhet">Sylhet Division</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="bloodType">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
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
              <div className="space-y-2">
                <Label htmlFor="period">Time Period</Label>
                <Select defaultValue="all-time">
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full bg-[#264653] hover:bg-[#1e3a45]">
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs id="leaderboard" defaultValue="top" className="space-y-4">
          <TabsList>
            <TabsTrigger value="top">Top Donors</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Donors</TabsTrigger>
            <TabsTrigger value="free">Free Donors</TabsTrigger>
          </TabsList>

          <TabsContent value="top" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#264653] text-white p-4 grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-5">Donor</div>
                    <div className="col-span-2 text-center">Blood Type</div>
                    <div className="col-span-2 text-center">Donations</div>
                    <div className="col-span-2 text-center">Points</div>
                  </div>

                  <div className="space-y-2">
                    {leaderboardData.slice(0, 10).map((donor) => (
                      <Link
                        href={`/leaderboard/donor/${donor.rank}`}
                        key={donor.rank}
                        className={`rounded-lg ${
                          donor.isCurrentUser
                            ? "bg-[#F9F9F9] border-2 border-[#B83227]"
                            : "bg-white border"
                        } p-4 grid grid-cols-12 items-center`}
                      >
                        <div className="col-span-1 text-center">
                          <div
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                              donor.rank === 1
                                ? "bg-yellow-500"
                                : donor.rank === 2
                                ? "bg-gray-400"
                                : donor.rank === 3
                                ? "bg-amber-700"
                                : "bg-[#264653]"
                            } text-white font-bold text-sm`}
                          >
                            {donor.rank}
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={donor.avatar || "/placeholder.svg"}
                              alt={donor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{donor.name}</p>
                              {donor.isCurrentUser && (
                                <Badge className="h-5 text-[10px]">You</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {donor.location}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge className="bg-[#B83227]">
                            {donor.bloodType}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-center">
                          {donor.donations}
                        </div>
                        <div className="col-span-2 text-center font-medium">
                          {donor.points}
                        </div>
                      </Link>
                    ))}
                    {/* Current user row if not in top 10 */}
                    {!leaderboardData
                      .slice(0, 10)
                      .some((donor) => donor.isCurrentUser) && (
                      <>
                        <div className="text-center text-sm text-muted-foreground py-2">
                          ...
                        </div>
                        <div
                          className="rounded-lg bg-[#F9F9F9] border-2 border-[#B83227] p-4 grid grid-cols-12 items-center"
                          key="current-user"
                        >
                          <div className="col-span-1 text-center">
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#264653] text-white font-bold text-sm">
                              {leaderboardData[10].rank}
                            </div>
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={
                                  leaderboardData[10].avatar ||
                                  "/placeholder.svg"
                                }
                                alt={leaderboardData[10].name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">
                                  {leaderboardData[10].name}
                                </p>
                                <Badge className="h-5 text-[10px]">You</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {leaderboardData[10].location}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-[#B83227]">
                              {leaderboardData[10].bloodType}
                            </Badge>
                          </div>
                          <div className="col-span-2 text-center">
                            {leaderboardData[10].donations}
                          </div>
                          <div className="col-span-2 text-center font-medium">
                            {leaderboardData[10].points}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nearby" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#264653] text-white p-4 grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-5">Donor</div>
                    <div className="col-span-2 text-center">Blood Type</div>
                    <div className="col-span-2 text-center">Donations</div>
                    <div className="col-span-2 text-center">Points</div>
                  </div>

                  <div className="space-y-2">
                    {leaderboardData
                      .filter((donor) => donor.location === "Dhaka")
                      .slice(0, 5)
                      .map((donor) => (
                        <div
                          key={donor.rank}
                          className={`rounded-lg ${
                            donor.isCurrentUser
                              ? "bg-[#F9F9F9] border-2 border-[#B83227]"
                              : "bg-white border"
                          } p-4 grid grid-cols-12 items-center`}
                        >
                          <div className="col-span-1 text-center">
                            <div
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                                donor.rank === 1
                                  ? "bg-yellow-500"
                                  : donor.rank === 2
                                  ? "bg-gray-400"
                                  : donor.rank === 3
                                  ? "bg-amber-700"
                                  : "bg-[#264653]"
                              } text-white font-bold text-sm`}
                            >
                              {donor.rank}
                            </div>
                          </div>
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={donor.avatar || "/placeholder.svg"}
                                alt={donor.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{donor.name}</p>
                                {donor.isCurrentUser && (
                                  <Badge className="h-5 text-[10px]">You</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {donor.location}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 text-center">
                            <Badge className="bg-[#B83227]">
                              {donor.bloodType}
                            </Badge>
                          </div>
                          <div className="col-span-2 text-center">
                            {donor.donations}
                          </div>
                          <div className="col-span-2 text-center font-medium">
                            {donor.points}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="free" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="rounded-lg bg-[#264653] text-white p-4 grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-5">Donor</div>
                    <div className="col-span-2 text-center">Blood Type</div>
                    <div className="col-span-2 text-center">Donations</div>
                    <div className="col-span-2 text-center">Points</div>
                  </div>

                  <div className="space-y-2">
                    {leaderboardData.slice(0, 5).map((donor) => (
                      <div
                        key={donor.rank}
                        className={`rounded-lg ${
                          donor.isCurrentUser
                            ? "bg-[#F9F9F9] border-2 border-[#B83227]"
                            : "bg-white border"
                        } p-4 grid grid-cols-12 items-center`}
                      >
                        <div className="col-span-1 text-center">
                          <div
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                              donor.rank === 1
                                ? "bg-yellow-500"
                                : donor.rank === 2
                                ? "bg-gray-400"
                                : donor.rank === 3
                                ? "bg-amber-700"
                                : "bg-[#264653]"
                            } text-white font-bold text-sm`}
                          >
                            {donor.rank}
                          </div>
                        </div>
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={donor.avatar || "/placeholder.svg"}
                              alt={donor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{donor.name}</p>
                              {donor.isCurrentUser && (
                                <Badge className="h-5 text-[10px]">You</Badge>
                              )}
                              <Badge className="bg-[#2A9D8F] h-5 text-[10px]">
                                Free Donor
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {donor.location}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge className="bg-[#B83227]">
                            {donor.bloodType}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-center">
                          {donor.donations}
                        </div>
                        <div className="col-span-2 text-center font-medium">
                          {donor.points}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
