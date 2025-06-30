import { ArrowLeft, Calendar, Clock, Droplet, MapPin, User } from "lucide-react"
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

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  // Mock data - in a real app, you would fetch this data based on the ID
  const request = {
    id: params.id,
    title: "Emergency Blood Needed",
    bloodType: "O+",
    status: "Active",
    urgency: "High",
    createdAt: "2023-05-15T10:30:00Z",
    expiresAt: "2023-05-22T10:30:00Z",
    location: "City Hospital, 123 Main St, Dhanmondi.",
    units: 2,
    description:
      "Blood needed for emergency surgery. Patient has rare blood condition requiring immediate transfusion.",
    hospital: {
      name: "City Hospital",
      address: "123 Main St, Dhanmondi",
      phone: "+1 (555) 123-4567",
      email: "contact@cityhospital.com",
    },
    donors: [
      {
        id: "donor1",
        name: "John Doe",
        bloodType: "O+",
        status: "Confirmed",
        donationDate: "2023-05-17T14:00:00Z",
      },
    ],
  }

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
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

  const daysRemaining = calculateDaysRemaining(request.expiresAt)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/requests">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Request Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{request.title}</CardTitle>
                  <CardDescription>Request ID: {request.id}</CardDescription>
                </div>
                <Badge
                  className={
                    request.status === "Active"
                      ? "bg-green-500"
                      : request.status === "Completed"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                  }
                >
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-red-500" />
                <span className="font-medium">Blood Type:</span>
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-200"
                >
                  {request.bloodType}
                </Badge>
                <span className="font-medium ml-4">Units Needed:</span>
                <span>{request.units}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span>{request.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Created:</span>
                <span>{formatDate(request.createdAt)}</span>
                <Clock className="h-5 w-5 ml-4 text-gray-500" />
                <span>{formatTime(request.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Expires:</span>
                <span>{formatDate(request.expiresAt)}</span>
                <Badge
                  variant={daysRemaining <= 2 ? "destructive" : "outline"}
                  className="ml-2"
                >
                  {daysRemaining} days remaining
                </Badge>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700">{request.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Respond to Request</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confirmed Donors</CardTitle>
              <CardDescription>
                {request.donors.length} of {request.units} units confirmed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {request.donors.length > 0 ? (
                <div className="space-y-4">
                  {request.donors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {donor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-gray-500">
                            Blood Type: {donor.bloodType}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500">{donor.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(donor.donationDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No donors have confirmed yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Name</h3>
                <p>{request.hospital.name}</p>
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p>{request.hospital.address}</p>
              </div>
              <div>
                <h3 className="font-medium">Contact</h3>
                <p>{request.hospital.phone}</p>
                <p className="text-sm text-gray-500">
                  {request.hospital.email}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Hospital
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">Schedule Donation</Button>
              <Button variant="outline" className="w-full">
                Share Request
              </Button>
              <Button variant="secondary" className="w-full">
                Save Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
