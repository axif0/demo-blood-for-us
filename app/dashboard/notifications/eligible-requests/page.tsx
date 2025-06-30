import { ArrowLeft, Calendar, Droplet, MapPin, Search } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EligibleRequestsPage() {
  // Mock data - in a real app, you would fetch this data
  const requests = [
    {
      id: "req1",
      title: "Emergency Blood Needed",
      bloodType: "O+",
      urgency: "High",
      location: "City Hospital, 123 Main St",
      distance: "2.5 miles",
      createdAt: "2023-05-15T10:30:00Z",
      expiresAt: "2023-05-22T10:30:00Z",
      hospital: "City Hospital",
    },
    {
      id: "req2",
      title: "Blood Donation Drive",
      bloodType: "O+",
      urgency: "Medium",
      location: "Community Center, 456 Oak Ave",
      distance: "3.8 miles",
      createdAt: "2023-05-14T09:15:00Z",
      expiresAt: "2023-05-28T09:15:00Z",
      hospital: "Red Cross",
    },
    {
      id: "req3",
      title: "Regular Donation Needed",
      bloodType: "O+",
      urgency: "Low",
      location: "Blood Bank, 789 Pine St",
      distance: "5.2 miles",
      createdAt: "2023-05-12T14:45:00Z",
      expiresAt: "2023-06-12T14:45:00Z",
      hospital: "Regional Blood Bank",
    },
    {
      id: "req4",
      title: "Urgent Surgery Requirement",
      bloodType: "O+",
      urgency: "High",
      location: "Memorial Hospital, 321 Elm St",
      distance: "6.7 miles",
      createdAt: "2023-05-16T08:00:00Z",
      expiresAt: "2023-05-20T08:00:00Z",
      hospital: "Memorial Hospital",
    },
  ]

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate days remaining
  const calculateDaysRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/notifications">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Eligible Blood Requests</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>You're Eligible to Donate!</CardTitle>
          <CardDescription>
            Based on your health report, you can now donate blood. Find requests
            that match your blood type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                <Droplet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">
                  Your Blood Type: O+
                </h3>
                <p className="text-green-700 mt-1">
                  Your blood type is compatible with the following requests. You
                  can make a significant impact by donating now!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="distance">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="urgency">Urgency</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="high">High Urgency</SelectItem>
                  <SelectItem value="medium">Medium Urgency</SelectItem>
                  <SelectItem value="low">Low Urgency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{request.title}</h3>
                            <Badge
                              className={
                                request.urgency === "High"
                                  ? "bg-red-500"
                                  : request.urgency === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              }
                            >
                              {request.urgency} Urgency
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Droplet className="h-4 w-4 text-red-500" />
                            <Badge
                              variant="outline"
                              className="text-red-500 border-red-200"
                            >
                              {request.bloodType}
                            </Badge>
                            <MapPin className="h-4 w-4 ml-2" />
                            <span>{request.location}</span>
                            <span className="ml-1">({request.distance})</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Expires: {formatDate(request.expiresAt)}
                            </span>
                            <Badge variant="outline">
                              {calculateDaysRemaining(request.expiresAt)} days
                              left
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 self-end md:self-center">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/requests/${request.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm">Respond</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="map">
              <div className="bg-muted rounded-lg h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Map View</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
                    The map view would display all eligible blood requests near
                    your location.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Save Search</Button>
          <Button>Schedule a Donation</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
