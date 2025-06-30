import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User, Plus, CalendarIcon } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export default function DonationSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Donation Schedule</h2>
          <p className="text-muted-foreground">Manage upcoming blood donation appointments</p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Donation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Upcoming Donations</CardTitle>
            <CardDescription>Scheduled blood donations for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="all">All Upcoming</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#264653] text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">10:30 AM - 11:00 AM</h3>
                          <Badge className="bg-[#2A9D8F]">Confirmed</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Kamal Hossain</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Blood Donation Center, 2nd Floor</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Blood Type:</span> O+
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col lg:flex-row">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#264653] text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">2:00 PM - 2:30 PM</h3>
                          <Badge className="bg-[#2A9D8F]">Confirmed</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Fatima Khan</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Blood Donation Center, 2nd Floor</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Blood Type:</span> A+
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col lg:flex-row">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#264653] text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">4:30 PM - 5:00 PM</h3>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Rahim Ahmed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Blood Donation Center, 2nd Floor</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Blood Type:</span> B+
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col lg:flex-row">
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white" size="sm">
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tomorrow" className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#264653] text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">9:00 AM - 9:30 AM</h3>
                          <Badge className="bg-[#2A9D8F]">Confirmed</Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>Jamal Uddin</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Blood Donation Center, 2nd Floor</span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Blood Type:</span> AB-
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col lg:flex-row">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="week" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">5 Donations Scheduled This Week</h3>
                  <p className="mt-1">View the calendar for a detailed schedule</p>
                </div>
              </TabsContent>

              <TabsContent value="all" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">12 Upcoming Donations</h3>
                  <p className="mt-1">View the calendar for a detailed schedule</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>May 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              className="rounded-md border"
              selected={new Date()}
              disabled={{ before: new Date() }}
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#2A9D8F]"></div>
                <span className="text-sm">Confirmed (8)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                <span className="text-sm">Pending (3)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#B83227]"></div>
                <span className="text-sm">Critical Need (2)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Completed blood donations in the past 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <div className="grid grid-cols-12 bg-[#264653] text-white p-3 text-sm font-medium rounded-t-lg">
              <div className="col-span-2">Date</div>
              <div className="col-span-3">Donor</div>
              <div className="col-span-2">Blood Type</div>
              <div className="col-span-2">Units</div>
              <div className="col-span-3">Status</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-12 p-3 text-sm">
                <div className="col-span-2">May 14, 2025</div>
                <div className="col-span-3">Kamal Hossain</div>
                <div className="col-span-2">O+</div>
                <div className="col-span-2">1</div>
                <div className="col-span-3">
                  <Badge className="bg-[#2A9D8F]">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-12 p-3 text-sm">
                <div className="col-span-2">May 12, 2025</div>
                <div className="col-span-3">Fatima Khan</div>
                <div className="col-span-2">A+</div>
                <div className="col-span-2">1</div>
                <div className="col-span-3">
                  <Badge className="bg-[#2A9D8F]">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-12 p-3 text-sm">
                <div className="col-span-2">May 10, 2025</div>
                <div className="col-span-3">Rahim Ahmed</div>
                <div className="col-span-2">B+</div>
                <div className="col-span-2">1</div>
                <div className="col-span-3">
                  <Badge className="bg-[#2A9D8F]">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-12 p-3 text-sm">
                <div className="col-span-2">May 8, 2025</div>
                <div className="col-span-3">Jamal Uddin</div>
                <div className="col-span-2">AB-</div>
                <div className="col-span-2">1</div>
                <div className="col-span-3">
                  <Badge className="bg-[#2A9D8F]">Completed</Badge>
                </div>
              </div>
              <div className="grid grid-cols-12 p-3 text-sm">
                <div className="col-span-2">May 5, 2025</div>
                <div className="col-span-3">Nusrat Jahan</div>
                <div className="col-span-2">O-</div>
                <div className="col-span-2">1</div>
                <div className="col-span-3">
                  <Badge className="bg-[#2A9D8F]">Completed</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Donations</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
