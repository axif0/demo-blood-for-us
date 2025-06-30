import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, CheckCircle } from "lucide-react"

type HospitalRequestsProps = {
  extended?: boolean
}

export function HospitalRequests({ extended = false }: HospitalRequestsProps) {
  const requests = [
    {
      id: "req-001",
      bloodType: "A+",
      units: 2,
      status: "Pending",
      timePosted: "10 minutes ago",
      urgency: "Critical",
      patientCondition: "Accident victim",
      donorMatched: null,
    },
    {
      id: "req-002",
      bloodType: "O-",
      units: 1,
      status: "Accepted",
      timePosted: "1 hour ago",
      urgency: "Urgent",
      patientCondition: "Surgery scheduled",
      donorMatched: "Kamal Hossain",
    },
    {
      id: "req-003",
      bloodType: "B+",
      units: 3,
      status: "Completed",
      timePosted: "1 day ago",
      urgency: "Normal",
      patientCondition: "Thalassemia patient",
      donorMatched: "Rahim Ahmed",
    },
    {
      id: "req-004",
      bloodType: "AB+",
      units: 2,
      status: "Expired",
      timePosted: "3 days ago",
      urgency: "Urgent",
      patientCondition: "Childbirth complications",
      donorMatched: null,
    },
  ]

  const displayRequests = extended ? requests : requests.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayRequests.map((request) => (
        <div key={request.id} className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold">
                {request.bloodType}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{request.units} unit(s)</h4>
                  <Badge
                    className={
                      request.status === "Pending"
                        ? "bg-[#777777]"
                        : request.status === "Accepted"
                          ? "bg-[#264653]"
                          : request.status === "Completed"
                            ? "bg-[#2A9D8F]"
                            : "bg-red-500"
                    }
                  >
                    {request.status}
                  </Badge>
                  <Badge
                    className={
                      request.urgency === "Critical"
                        ? "bg-[#B83227]"
                        : request.urgency === "Urgent"
                          ? "bg-orange-500"
                          : "bg-[#264653]"
                    }
                  >
                    {request.urgency === "Critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
                    {request.urgency}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{request.timePosted}</span>
                </div>
              </div>
            </div>
          </div>

          {extended && (
            <div className="mt-2 text-sm">
              <p className="text-muted-foreground">Patient: {request.patientCondition}</p>
              {request.donorMatched && (
                <p className="mt-1 flex items-center gap-1 text-[#2A9D8F]">
                  <CheckCircle className="h-4 w-4" />
                  <span>Donor: {request.donorMatched}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-3 flex gap-2">
            {request.status === "Pending" && (
              <>
                <Button className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white" size="sm">
                  Find Donors
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Edit Request
                </Button>
              </>
            )}
            {request.status === "Accepted" && (
              <>
                <Button className="w-full bg-[#2A9D8F] hover:bg-[#238b7e] text-white" size="sm">
                  Mark Complete
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Donor
                </Button>
              </>
            )}
            {(request.status === "Completed" || request.status === "Expired") && (
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            )}
          </div>
        </div>
      ))}

      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/hospital-dashboard/requests">View All Requests</Link>
        </Button>
      )}
    </div>
  )
}
