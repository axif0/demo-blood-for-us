import {
  ArrowLeft,
  Award,
  Calendar,
  Droplet,
  MapPin,
  Star,
  User,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const donors = [
  {
    name: "Rahim Ahmed",
    userName: "rahimahmed",
    image: "rahim.jpg",
    bloodGroup: "O+",
    location: "Dhaka",
    joinDate: "2023-06-15T10:30:00Z",
    bio: "Passionate blood donor and community volunteer.",
  },
  {
    name: "Rahim Ahmed",
    userName: "rahimahmed",
    image: "rahim.jpg",
    bloodGroup: "O+",
    location: "Dhaka",
    joinDate: "2023-06-15T10:30:00Z",
    bio: "Passionate blood donor and community volunteer.",
  },
  {
    name: "Fatima Khan",
    userName: "fatimakhan",
    image: "fatima.jpg",
    bloodGroup: "A+",
    location: "Chattogram",
    joinDate: "2022-11-22T09:00:00Z",
    bio: "Committed to saving lives through blood donation.",
  },
  {
    name: "Jamal Uddin",
    userName: "jamal",
    image: "jamal.jpg",
    bloodGroup: "B+",
    location: "Sylhet",
    joinDate: "2021-03-10T14:45:00Z",
    bio: "Always ready to help in emergencies.",
  },
  {
    name: "Nusrat Jahan",
    userName: "nusrat34",
    image: "rahima.png",
    bloodGroup: "AB+",
    location: "Dhaka",
    joinDate: "2023-01-05T08:20:00Z",
    bio: "Proud to be a regular donor and healthcare advocate.",
  },
  {
    name: "Masud Rana",
    userName: "masudrana1",
    image: "kamal.png",
    bloodGroup: "A-",
    location: "Khulna",
    joinDate: "2022-08-18T12:00:00Z",
    bio: "Donating blood is my way of giving back.",
  },
  {
    name: "Sadia Islam",
    userName: "sadiaislam56",
    image: "drfatima.jpg",
    bloodGroup: "B-",
    location: "Rajshahi",
    joinDate: "2023-04-29T16:10:00Z",
    bio: "Inspired to donate after a personal experience.",
  },
  {
    name: "Arif Hossain",
    userName: "arifhossain",
    image: "arif.jpg",
    bloodGroup: "O+",
    location: "Mymensingh",
    joinDate: "2021-12-02T11:30:00Z",
    bio: "Active donor and awareness campaigner.",
  },
  {
    name: "tahmina Akter",
    userName: "tahmina555",
    image: "tahmina.jpg",
    bloodGroup: "AB-",
    location: "Rangpur",
    joinDate: "2023-07-10T13:25:00Z",
    bio: "I believe in the power of kindness and donation.",
  },
  {
    name: "Rafiq Islam",
    userName: "rafiqislam",
    image: "rafiq.png",
    bloodGroup: "B+",
    location: "Barisal",
    joinDate: "2022-05-16T10:00:00Z",
    bio: "Helping others is the best reward.",
  },
  {
    name: "Nasrin Begum",
    userName: "nasringbegum",
    image: "nasrin.jpg",
    bloodGroup: "AB-",
    location: "Cumilla",
    joinDate: "2023-09-23T09:50:00Z",
    bio: "Regular donor and blood camp organizer.",
  },
  {
    name: "Kamal Hossain",
    userName: "kamal789",
    image: "kamal.png",
    bloodGroup: "A+",
    location: "Gazipur",
    joinDate: "2022-10-12T15:15:00Z",
    bio: "Making a difference one donation at a time.",
  },
]

export default async function DonorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await params in Next.js 15
  const { id: idParam } = await params;
  const id = Number(idParam)
  
  const donor = {
    id: idParam,
    name: donors[id].name,
    username: donors[id].userName,
    avatar: `/${donors[id].image}?height=100&width=100`,
    bloodType: donors[id].bloodGroup,
    location: donors[id].location,
    joinedDate: donors[id].joinDate,
    bio: donors[id].bio,
    stats: {
      donations: 12,
      lives: 36,
      points: 1250,
      rank: 3,
      nextRank: {
        name: "Gold Donor",
        pointsNeeded: 250,
      },
    },
    badges: [
      {
        id: "1",
        name: "First Donation",
        icon: "Award",
        date: "2022-01-20T00:00:00Z",
      },
      {
        id: "2",
        name: "Regular Donor",
        icon: "Clock",
        date: "2022-07-20T00:00:00Z",
      },
      {
        id: "3",
        name: "Life Saver",
        icon: "Heart",
        date: "2022-10-15T00:00:00Z",
      },
    ],
    donationHistory: [
      {
        id: "d1",
        date: "2023-04-15T00:00:00Z",
        location: "City Hospital",
        bloodType: "O+",
        units: 1,
      },
      {
        id: "d2",
        date: "2023-01-10T00:00:00Z",
        location: "Red Cross Center",
        bloodType: "O+",
        units: 1,
      },
      {
        id: "d3",
        date: "2022-10-05T00:00:00Z",
        location: "Community Blood Drive",
        bloodType: "O+",
        units: 1,
      },
      {
        id: "d4",
        date: "2022-07-20T00:00:00Z",
        location: "City Hospital",
        bloodType: "O+",
        units: 1,
      },
    ],
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/leaderboard">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Donor Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={donor.avatar || "/placeholder.svg"}
                    alt={donor.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {donor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{donor.name}</CardTitle>
              <CardDescription>@{donor.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-red-500" />
                <span>Blood Type:</span>
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-200"
                >
                  {donor.bloodType}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{donor.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Joined {formatDate(donor.joinedDate)}</span>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-gray-700">{donor.bio}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Donor</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Achievements earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {donor.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{badge.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDate(badge.date).split(",")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donor Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{donor.stats.donations}</p>
                  <p className="text-sm text-gray-500">Donations</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{donor.stats.lives}</p>
                  <p className="text-sm text-gray-500">Lives Saved</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{donor.stats.points}</p>
                  <p className="text-sm text-gray-500">Points</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">#{donor.stats.rank}</p>
                  <p className="text-sm text-gray-500">Rank</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">
                    Progress to {donor.stats.nextRank.name}
                  </span>
                  <span className="text-sm font-medium">
                    {donor.stats.nextRank.pointsNeeded} points needed
                  </span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Donation History</CardTitle>
              <CardDescription>
                Past donations and contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="history">
                <TabsList className="mb-4">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <div className="space-y-4">
                    {donor.donationHistory.map((donation, index) => (
                      <div
                        key={donation.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {formatDate(donation.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {donation.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className="text-red-500 border-red-200"
                          >
                            {donation.bloodType}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            {donation.units}{" "}
                            {donation.units === 1 ? "unit" : "units"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="impact">
                  <div className="text-center py-8 space-y-4">
                    <div className="inline-flex h-20 w-20 rounded-full bg-green-100 items-center justify-center">
                      <User className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold">
                      You've helped save 36 lives!
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Each donation can save up to 3 lives. Your consistent
                      donations have made a significant impact in your
                      community.
                    </p>
                    <div className="pt-4">
                      <Button>Schedule Your Next Donation</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
