import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LeaderboardPreview() {
  const leaderboardData = [
    {
      rank: 1,
      name: "Rahim Ahmed",
      donations: 24,
      points: 1250,
      avatar: "/rahim.jpg?height=40&width=40",
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: "Fatima Khan",
      donations: 20,
      points: 1100,
      avatar: "/fatima.jpg?height=40&width=40",
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: "Jamal Uddin",
      donations: 18,
      points: 980,
      avatar: "/jamal.jpg?height=40&width=40",
      isCurrentUser: false,
    },
    {
      rank: 42,
      name: "Kamal Hossain",
      donations: 8,
      points: 350,
      avatar: "/kamal.png?height=40&width=40",
      isCurrentUser: true,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {leaderboardData.slice(0, 3).map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between rounded-lg p-2 ${
              user.isCurrentUser ? "bg-[#F9F9F9]" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${
                  user.rank === 1
                    ? "bg-yellow-500"
                    : user.rank === 2
                    ? "bg-gray-400"
                    : "bg-amber-700"
                } text-white font-bold text-xs`}
              >
                {user.rank}
              </div>
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.donations} donations
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{user.points}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-2">
        <div className="flex items-center justify-between rounded-lg bg-[#F9F9F9] p-2">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#264653] text-white font-bold text-xs">
              {leaderboardData[3].rank}
            </div>
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={leaderboardData[3].avatar || "/placeholder.svg"}
                alt={leaderboardData[3].name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="font-medium">{leaderboardData[3].name}</p>
                <Badge className="h-4 text-[10px]">You</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {leaderboardData[3].donations} donations
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{leaderboardData[3].points}</p>
            <p className="text-xs text-muted-foreground">points</p>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/dashboard/leaderboard">View Full Leaderboard</Link>
      </Button>
    </div>
  )
}
