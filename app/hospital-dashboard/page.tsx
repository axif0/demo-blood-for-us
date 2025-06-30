import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HospitalStats } from "@/components/hospital/hospital-stats"
import { HospitalRequests } from "@/components/hospital/hospital-requests"
import { HospitalDonors } from "@/components/hospital/hospital-donors"
import { HospitalInventory } from "@/components/hospital/hospital-inventory"

export default function HospitalDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hospital Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Dhaka Medical College Hospital!</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-[#B83227] hover:bg-[#a12a22] text-white" asChild>
            <Link href="/hospital-dashboard/requests/create">Create Blood Request</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/hospital-dashboard/donors">Find Donors</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="donors">Donors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
                <Badge className="bg-[#B83227]">5 urgent</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 accepted by donors</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Donors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">Within 5km radius</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blood Units</CardTitle>
                <Badge className="bg-[#2A9D8F]">+15 this week</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">In inventory</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Shortage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#B83227]">O-, AB-</div>
                <p className="text-xs text-muted-foreground">Need immediate donors</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Blood Request Statistics</CardTitle>
                <CardDescription>Monthly request and fulfillment rates</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalStats />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
                <CardDescription>Status of your recent blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalRequests />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Nearby Donors</CardTitle>
                <CardDescription>Available donors in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalDonors />
              </CardContent>
            </Card>
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Blood Inventory</CardTitle>
                <CardDescription>Current blood units by type</CardDescription>
              </CardHeader>
              <CardContent>
                <HospitalInventory />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Requests</CardTitle>
              <CardDescription>Manage your hospital's blood requests</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalRequests extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blood Inventory</CardTitle>
              <CardDescription>Manage your hospital's blood inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalInventory extended />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donor Directory</CardTitle>
              <CardDescription>Find and contact available donors</CardDescription>
            </CardHeader>
            <CardContent>
              <HospitalDonors extended />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
