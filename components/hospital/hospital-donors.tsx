import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone } from "lucide-react"

type HospitalDonorsProps = {
  extended?: boolean
}

export function HospitalDonors({ extended = false }: HospitalDonorsProps) {
  const donors = [
    {
      id: "donor-001",
      name: "Kamal Hossain",
      bloodType: "O+",
      distance: "1.2 km",
      lastDonation: "45 days ago",
      donations: 8,
      available: true,
      avatar: "/kamal.png?height=40&width=40",
    },
    {
      id: "donor-002",
      name: "Fatima Khan",
      bloodType: "A+",
      distance: "2.5 km",
      lastDonation: "90+ days ago",
      donations: 20,
      available: true,
      avatar: "/fatima.jpg?height=40&width=40",
    },
    {
      id: "donor-003",
      name: "Rahim Ahmed",
      bloodType: "B+",
      distance: "3.8 km",
      lastDonation: "30 days ago",
      donations: 24,
      available: false,
      avatar: "/rahim.jpg?height=40&width=40",
    },
    {
      id: "donor-004",
      name: "Jamal Uddin",
      bloodType: "AB-",
      distance: "4.2 km",
      lastDonation: "90+ days ago",
      donations: 18,
      available: true,
      avatar: "/jamal.jpg?height=40&width=40",
    },
  ]

  const displayDonors = extended ? donors : donors.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayDonors.map((donor) => (
        <div key={donor.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={donor.avatar || "/placeholder.svg"}
                  alt={donor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{donor.name}</h4>
                  <Badge className="bg-[#B83227]">{donor.bloodType}</Badge>
                  {donor.available ? (
                    <Badge className="bg-[#2A9D8F]">Available</Badge>
                  ) : (
                    <Badge variant="outline">Unavailable</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{donor.distance}</span>
                  <span>•</span>
                  <span>Last donation: {donor.lastDonation}</span>
                </div>
              </div>
            </div>
          </div>

          {extended && (
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Total donations: {donor.donations}</p>
            </div>
          )}

          <div className="mt-3 flex gap-2">
            {donor.available && (
              <Button
                className="w-full bg-[#264653] hover:bg-[#1e3a45] text-white"
                size="sm"
              >
                Request Donation
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className={donor.available ? "w-1/2" : "w-full"}
            >
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>
      ))}

      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/hospital-dashboard/donors">View All Donors</Link>
        </Button>
      )}
    </div>
  )
}
