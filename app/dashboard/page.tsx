"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonorStats } from "@/components/dashboard/donor-stats"
import { RecentRequests } from "@/components/dashboard/recent-requests"
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview"
import { HealthRecordsSummary } from "@/components/dashboard/health-records-summary"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, Kamal! Your last donation was 45 days ago.
          </p>
        </div>
        <Button className="bg-[#B83227] hover:bg-[#a12a22] text-white" asChild>
          <Link href="/dashboard/requests">View Blood Requests</Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Donations
                </CardTitle>
                <Badge className="bg-[#2A9D8F]">+1 this month</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  You've potentially saved 8 lives
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Leaderboard Rank
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#42</div>
                <p className="text-xs text-muted-foreground">
                  In Dhaka Division
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Points Earned
                </CardTitle>
                <Badge className="bg-[#2A9D8F]">+50 this month</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">350</div>
                <p className="text-xs text-muted-foreground">
                  150 points until next badge
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Next Eligible Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jun 30, 2025</div>
                <p className="text-xs text-muted-foreground">
                  45 days remaining
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>
                  Your blood donation journey over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DonorStats />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Nearby Requests</CardTitle>
                <CardDescription>Blood requests in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentRequests />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top donors in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <LeaderboardPreview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Health Records</CardTitle>
                <CardDescription>
                  Your recent health checkups and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HealthRecordsSummary />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Requests</CardTitle>
              <CardDescription>
                View and manage blood requests in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentRequests extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Records</CardTitle>
              <CardDescription>
                Your health checkups and medical reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HealthRecordsSummary extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
              <CardDescription>
                Rewards earned through your donations
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#B83227] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12.3 2.9c.7-.7 1.7-.7 2.4 0l6.4 6.4c.7.7.7 1.7 0 2.4l-6.4 6.4c-.7.7-1.7.7-2.4 0l-6.4-6.4c-.7-.7-.7-1.7 0-2.4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">First Donation</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Completed your first blood donation
                </p>
                <Badge className="bg-[#2A9D8F]">Earned</Badge>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#B83227] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">5 Donations</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Completed 5 blood donations
                </p>
                <Badge className="bg-[#2A9D8F]">Earned</Badge>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#B83227] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Emergency Hero</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Donated in an emergency situation
                </p>
                <Badge className="bg-[#2A9D8F]">Earned</Badge>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#777777] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5Z" />
                    <path d="m3 3 18 18" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">10 Donations</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Complete 10 blood donations
                </p>
                <Badge variant="outline">In Progress (8/10)</Badge>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#777777] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Consistent Donor</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Donate blood every 3 months for a year
                </p>
                <Badge variant="outline">In Progress (2/4)</Badge>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 shadow-sm">
                <div className="rounded-full bg-[#777777] p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 8a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v-4h2a2 2 0 0 0 0-4Z" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Top 100 Donor</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Reach the top 100 on the national leaderboard
                </p>
                <Badge variant="outline">Locked</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
