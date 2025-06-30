import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HospitalRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">Manage and track all blood requests from your hospital</p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45]" asChild>
          <Link href="/hospital-dashboard/requests/create">Create New Request</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Requests</CardTitle>
          <CardDescription>Filter blood requests by status, blood type, and date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search by patient ID or name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select>
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
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
              <Label htmlFor="urgency">Urgency</Label>
              <Select>
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Range</Label>
              <Select>
                <SelectTrigger id="date">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-[#264653] hover:bg-[#1e3a45]">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending Donors</TabsTrigger>
          <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                        A+
                      </div>
                      <div>
                        <h4 className="font-medium">Patient ID: P-2024-0587</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Requested: 2 hours ago</span>
                          <span>•</span>
                          <span>Department: Emergency</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#B83227] text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Critical
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units needed: 2</p>
                    <p>Patient: Accident victim with severe blood loss</p>
                    <p>Donor responses: 1/2</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Request
                    </Button>
                    <Button className="w-full bg-[#2A9D8F] hover:bg-[#238a7e] text-white" size="sm">
                      Find Donors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold">
                        O-
                      </div>
                      <div>
                        <h4 className="font-medium">Patient ID: P-2024-0583</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Requested: 5 hours ago</span>
                          <span>•</span>
                          <span>Department: Surgery</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#E76F51] text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Urgent
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units needed: 3</p>
                    <p>Patient: Scheduled surgery tomorrow morning</p>
                    <p>Donor responses: 0/3</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Edit Request
                    </Button>
                    <Button className="w-full bg-[#2A9D8F] hover:bg-[#238a7e] text-white" size="sm">
                      Find Donors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold">
                        B+
                      </div>
                      <div>
                        <h4 className="font-medium">Patient ID: P-2024-0581</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Requested: Yesterday</span>
                          <span>•</span>
                          <span>Department: Oncology</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-[#F4A261]">Pending Donors</Badge>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units needed: 2</p>
                    <p>Patient: Cancer treatment</p>
                    <p>Donor responses: 2/2 (awaiting donation)</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    <Button className="w-full bg-[#2A9D8F] hover:bg-[#238a7e] text-white" size="sm">
                      Manage Donors
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fulfilled" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold">
                        AB+
                      </div>
                      <div>
                        <h4 className="font-medium">Patient ID: P-2024-0575</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Requested: 2 days ago</span>
                          <span>•</span>
                          <span>Fulfilled: Yesterday</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#2A9D8F] text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Fulfilled
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units needed: 1</p>
                    <p>Patient: Routine transfusion</p>
                    <p>Donors: Rahim Ahmed, Fatima Khan</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Send Thank You
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold">
                        O+
                      </div>
                      <div>
                        <h4 className="font-medium">Patient ID: P-2024-0570</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Requested: 5 days ago</span>
                          <span>•</span>
                          <span>Expired: Yesterday</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">Expired</Badge>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units needed: 2</p>
                    <p>Patient: Emergency case (resolved with inventory)</p>
                    <p>Donor responses: 1/2</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Create Similar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
