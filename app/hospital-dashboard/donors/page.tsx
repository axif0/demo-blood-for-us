import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Download, UserPlus, Phone, Mail, Calendar } from "lucide-react"
import Image from "next/image"

export default function DonorDirectoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Donor Directory</h2>
          <p className="text-muted-foreground">
            Manage and search for blood donors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#264653] hover:bg-[#1e3a45]">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Donor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Donors</CardTitle>
          <CardDescription>
            Find donors by blood type, location, and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search by name or ID" />
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
              <Label htmlFor="location">Location</Label>
              <Select>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="dhaka">Dhaka</SelectItem>
                  <SelectItem value="chittagong">Chittagong</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  <SelectItem value="khulna">Khulna</SelectItem>
                  <SelectItem value="barisal">Barisal</SelectItem>
                  <SelectItem value="sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select>
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
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

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Donors</TabsTrigger>
          <TabsTrigger value="regular">Regular Donors</TabsTrigger>
          <TabsTrigger value="free">Free Donors</TabsTrigger>
          <TabsTrigger value="recent">Recent Donors</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-lg overflow-hidden border">
                <div className="bg-[#264653] text-white p-4 grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-4">Donor</div>
                  <div className="col-span-2 text-center">Blood Type</div>
                  <div className="col-span-2 text-center">Last Donation</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Actions</div>
                </div>

                <div className="divide-y">
                  {/* Donor 1 */}
                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/rahim.jpg?height=40&width=40"
                          alt="Rahim Ahmed"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Rahim Ahmed</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>ID: D-0001</span>
                          <span>•</span>
                          <span>Dhaka</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#B83227]">O+</Badge>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      <div className="flex flex-col">
                        <span>May 1, 2024</span>
                        <span className="text-xs text-muted-foreground">
                          (14 days ago)
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-2 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Schedule</span>
                      </Button>
                    </div>
                  </div>

                  {/* Donor 2 */}
                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/fatima.jpg?height=40&width=40"
                          alt="Fatima Khan"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Fatima Khan</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>ID: D-0002</span>
                          <span>•</span>
                          <span>Dhaka</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#B83227]">A+</Badge>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      <div className="flex flex-col">
                        <span>April 15, 2024</span>
                        <span className="text-xs text-muted-foreground">
                          (30 days ago)
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-2 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Schedule</span>
                      </Button>
                    </div>
                  </div>

                  {/* Donor 3 */}
                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/jamal.jpg?height=40&width=40"
                          alt="Jamal Uddin"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Jamal Uddin</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>ID: D-0003</span>
                          <span>•</span>
                          <span>Chittagong</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#B83227]">B+</Badge>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      <div className="flex flex-col">
                        <span>May 10, 2024</span>
                        <span className="text-xs text-muted-foreground">
                          (5 days ago)
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge variant="outline">Unavailable</Badge>
                    </div>
                    <div className="col-span-2 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Schedule</span>
                      </Button>
                    </div>
                  </div>

                  {/* Donor 4 */}
                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/rahima.png?height=40&width=40"
                          alt="Nusrat Jahan"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Nusrat Jahan</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>ID: D-0004</span>
                          <span>•</span>
                          <span>Dhaka</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#B83227]">AB+</Badge>
                    </div>
                    <div className="col-span-2 text-center text-sm">
                      <div className="flex flex-col">
                        <span>March 20, 2024</span>
                        <span className="text-xs text-muted-foreground">
                          (56 days ago)
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-2 flex justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Schedule</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of 120 donors
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regular" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Regular Donors</h3>
                <p className="text-muted-foreground mt-2">
                  Donors who have donated 3 or more times in the past year
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="free" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Free Donors</h3>
                <p className="text-muted-foreground mt-2">
                  Donors who have volunteered to donate without compensation
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Recent Donors</h3>
                <p className="text-muted-foreground mt-2">
                  Donors who have donated in the past 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
