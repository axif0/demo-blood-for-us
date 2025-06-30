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
import Leaderboard from "@/components/leaderboard"

export default function LeaderboardPage() {
  // const leaderboardData = [
  //   {
  //     rank: 1,
  //     name: "Rahim Ahmed",
  //     donations: 24,
  //     points: 1250,
  //     bloodType: "O+",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 2,
  //     name: "Fatima Khan",
  //     donations: 20,
  //     points: 1100,
  //     bloodType: "A+",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 3,
  //     name: "Jamal Uddin",
  //     donations: 18,
  //     points: 980,
  //     bloodType: "B+",
  //     location: "Chittagong",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 4,
  //     name: "Nusrat Jahan",
  //     donations: 15,
  //     points: 850,
  //     bloodType: "AB+",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 5,
  //     name: "Masud Rana",
  //     donations: 14,
  //     points: 780,
  //     bloodType: "O-",
  //     location: "Sylhet",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 6,
  //     name: "Sadia Islam",
  //     donations: 12,
  //     points: 720,
  //     bloodType: "B-",
  //     location: "Rajshahi",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 7,
  //     name: "Arif Hossain",
  //     donations: 11,
  //     points: 650,
  //     bloodType: "A-",
  //     location: "Khulna",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 8,
  //     name: "Tahmina Akter",
  //     donations: 10,
  //     points: 600,
  //     bloodType: "O+",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 9,
  //     name: "Rafiq Islam",
  //     donations: 9,
  //     points: 520,
  //     bloodType: "B+",
  //     location: "Barisal",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 10,
  //     name: "Nasrin Begum",
  //     donations: 9,
  //     points: 500,
  //     bloodType: "AB-",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: false,
  //   },
  //   {
  //     rank: 42,
  //     name: "Kamal Hossain",
  //     donations: 8,
  //     points: 350,
  //     bloodType: "O+",
  //     location: "Dhaka",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     isCurrentUser: true,
  //   },
  // ]

  return <Leaderboard />
}
