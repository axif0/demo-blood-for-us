import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Droplet,
  MapPin,
} from "lucide-react"
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
import { Progress } from "@/components/ui/progress"

export default function DonationDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  // Mock data - in a real app, you would fetch this data based on the ID
  const donation = {
    id: params.id,
    date: "2023-05-15T10:30:00Z",
    location: "City Hospital Blood Bank",
    address: "123 Main St, Cityville",
    bloodType: "O+",
    units: 1,
    status: "Completed",
    recipient: {
      type: "Patient",
      name: "Anonymous Recipient",
      hospital: "City Hospital",
    },
    certificate: {
      id: "CERT-2023-001",
      issueDate: "2023-05-15T16:30:00Z",
      points: 100,
    },
    impact: {
      livesSaved: 3,
      totalDonations: 5,
      totalPoints: 500,
    },
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/notifications">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Donation Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Donation Completed</CardTitle>
                  <CardDescription>
                    Thank you for your contribution!
                  </CardDescription>
                </div>
                <Badge className="bg-green-500">{donation.status}</Badge>
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
                  {donation.bloodType}
                </Badge>
                <span className="font-medium ml-4">Units Donated:</span>
                <span>{donation.units}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span>{donation.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium ml-6">Address:</span>
                <span>{donation.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span>{formatDate(donation.date)}</span>
                <Clock className="h-5 w-5 ml-4 text-gray-500" />
                <span>{formatTime(donation.date)}</span>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Recipient Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {donation.recipient.type}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {donation.recipient.name}
                  </p>
                  <p>
                    <span className="font-medium">Hospital:</span>{" "}
                    {donation.recipient.hospital}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>
                The difference you're making with your donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">
                    {donation.impact.livesSaved}
                  </p>
                  <p className="text-sm text-gray-500">Lives Saved</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">
                    {donation.impact.totalDonations}
                  </p>
                  <p className="text-sm text-gray-500">Total Donations</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">
                    {donation.impact.totalPoints}
                  </p>
                  <p className="text-sm text-gray-500">Total Points</p>
                </div>
              </div>

              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">
                  You're making a real difference! Your donations have helped
                  save lives and contribute to your community's health.
                </p>
                <Button>Schedule Your Next Donation</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Certificate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-dashed border-primary/50 rounded-lg p-6 text-center space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">Certificate of Donation</h3>
                <p>This certifies that</p>
                <p className="text-lg font-bold">John Doe</p>
                <p>has donated blood on</p>
                <p className="font-medium">{formatDate(donation.date)}</p>
                <p className="text-sm text-gray-500">
                  Certificate ID: {donation.certificate.id}
                </p>
                <p className="text-sm text-gray-500">
                  Issued: {formatDate(donation.certificate.issueDate)}
                </p>
                <div className="mt-4 pt-4 border-t border-dashed border-primary/50">
                  <p className="font-medium">Points Earned</p>
                  <p className="text-2xl font-bold text-primary">
                    +{donation.certificate.points}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Download PDF</Button>
              <Button variant="outline">Share</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Rest for 24 hours</p>
                  <p className="text-sm text-gray-500">
                    Avoid strenuous activity
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Stay hydrated</p>
                  <p className="text-sm text-gray-500">
                    Drink plenty of fluids
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Schedule next donation</p>
                  <p className="text-sm text-gray-500">
                    You'll be eligible in 56 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
