import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone } from "lucide-react"
import Image from "next/image"

export default function FindDonorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Find Donors</h2>
          <p className="text-muted-foreground">Search for blood donors in your area</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Donors</CardTitle>
          <CardDescription>Find donors by blood type, location, and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter city or area" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Select>
                <SelectTrigger id="distance">
                  <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Within 5 km</SelectItem>
                  <SelectItem value="10">Within 10 km</SelectItem>
                  <SelectItem value="20">Within 20 km</SelectItem>
                  <SelectItem value="50">Within 50 km</SelectItem>
                  <SelectItem value="any">Any distance</SelectItem>
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
                  <SelectItem value="scheduled">Available This Week</SelectItem>
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
          <TabsTrigger value="nearby">Nearby Donors</TabsTrigger>
          <TabsTrigger value="free">Free Donors</TabsTrigger>
          <TabsTrigger value="regular">Regular Donors</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Donor Card 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Rahim Ahmed" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Rahim Ahmed</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">O+</Badge>
                    <Badge className="bg-[#2A9D8F]">Free Donor</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Dhaka, 2.5 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 14 days ago</p>
                    <p>Total donations: 24</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Card 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Fatima Khan" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Fatima Khan</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">A+</Badge>
                    <Badge className="bg-[#2A9D8F]">Free Donor</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Dhaka, 3.2 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 30 days ago</p>
                    <p>Total donations: 20</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Card 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Jamal Uddin" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Jamal Uddin</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">B+</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Chittagong, 120 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 5 days ago</p>
                    <p>Total donations: 18</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Card 4 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Nusrat Jahan" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Nusrat Jahan</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">AB+</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Dhaka, 5.1 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 56 days ago</p>
                    <p>Total donations: 15</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Card 5 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Masud Rana" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Masud Rana</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">O-</Badge>
                    <Badge className="bg-[#2A9D8F]">Free Donor</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Sylhet, 220 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 45 days ago</p>
                    <p>Total donations: 14</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Card 6 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-[#B83227]">
                    <Image src="/placeholder.svg?height=80&width=80" alt="Sadia Islam" fill className="object-cover" />
                  </div>
                  <h3 className="mt-2 font-bold">Sadia Islam</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#B83227]">B-</Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Rajshahi, 180 km away</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Last donation: 60 days ago</p>
                    <p>Total donations: 12</p>
                  </div>
                  <div className="mt-4 flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button className="flex-1 bg-[#264653] hover:bg-[#1e3a45]" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 6 of 120 donors</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nearby" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Nearby Donors</h3>
                <p className="text-muted-foreground mt-2">Donors within 10 km of your location</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="free" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Free Donors</h3>
                <p className="text-muted-foreground mt-2">Donors who have volunteered to donate without compensation</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regular" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Regular Donors</h3>
                <p className="text-muted-foreground mt-2">Donors who have donated 3 or more times in the past year</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
