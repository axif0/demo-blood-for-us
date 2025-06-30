import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecentRequests } from "@/components/dashboard/recent-requests"
import { Search, AlertTriangle } from "lucide-react"

export default function BloodRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">Find and respond to blood requests in your area</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Requests</CardTitle>
          <CardDescription>Filter blood requests by location, blood type, and urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location or distance" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select>
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Compatible</SelectItem>
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
            <div className="flex items-end">
              <Button className="w-full bg-[#264653] hover:bg-[#1e3a45]">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nearby" className="space-y-4">
        <TabsList>
          <TabsTrigger value="nearby">Nearby Requests</TabsTrigger>
          <TabsTrigger value="urgent">Urgent Requests</TabsTrigger>
          <TabsTrigger value="accepted">Accepted by Me</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="space-y-4">
          <div className="grid gap-4">
            <RecentRequests extended />
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
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
                        <h4 className="font-medium">Dhaka Medical College Hospital</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>2.5 km</span>
                          <span>•</span>
                          <span>10 minutes ago</span>
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
                    <p>Patient: Accident victim</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white" size="sm">
                      Accept Request
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  <p>You haven't accepted any requests yet.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
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
                        <h4 className="font-medium">United Hospital, Gulshan</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>7.2 km</span>
                          <span>•</span>
                          <span>Completed on May 15, 2024</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#2A9D8F] text-white text-xs px-2 py-1 rounded-full">Completed</div>
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>Units donated: 1</p>
                    <p>Patient: Surgery patient</p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Certificate
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
