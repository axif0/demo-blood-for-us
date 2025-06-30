import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, AlertTriangle } from "lucide-react"

type RequestProps = {
  extended?: boolean
}

export function RecentRequests({ extended = false }: RequestProps) {
  const requests = [
    {
      id: "req-001",
      bloodType: "A+",
      location: "Dhaka Medical College Hospital",
      distance: "2.5 km",
      timePosted: "10 minutes ago",
      urgency: "Critical",
      units: 2,
      patientCondition: "Accident victim",
    },
    {
      id: "req-002",
      bloodType: "O-",
      location: "Square Hospital, Panthapath",
      distance: "4.8 km",
      timePosted: "1 hour ago",
      urgency: "Urgent",
      units: 1,
      patientCondition: "Surgery scheduled",
    },
    {
      id: "req-003",
      bloodType: "B+",
      location: "United Hospital, Gulshan",
      distance: "7.2 km",
      timePosted: "3 hours ago",
      urgency: "Normal",
      units: 3,
      patientCondition: "Thalassemia patient",
    },
  ]

  const displayRequests = extended ? requests : requests.slice(0, 2)

  return (
    <div className="space-y-4">
      {displayRequests.map((request) => (
        <div key={request.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                {request.bloodType}
              </div>
              <div>
                <h4 className="font-medium">{request.location}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{request.distance}</span>
                  <Clock className="ml-1 h-3 w-3" />
                  <span>{request.timePosted}</span>
                </div>
              </div>
            </div>
            <Badge
              className={
                request.urgency === "Critical"
                  ? "bg-[#B83227]"
                  : request.urgency === "Urgent"
                  ? "bg-orange-500"
                  : "bg-[#264653]"
              }
            >
              {request.urgency === "Critical" && (
                <AlertTriangle className="mr-1 h-3 w-3" />
              )}
              {request.urgency}
            </Badge>
          </div>

          {extended && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Units needed: {request.units}</p>
              <p>Patient: {request.patientCondition}</p>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <Button
              className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white"
              size="sm"
            >
              Accept Request
            </Button>
            <Link href={`/dashboard/requests/${request.id}`} className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/requests">View All Requests</Link>
        </Button>
      )}
    </div>
  )
}
