"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle } from "lucide-react"

type HospitalInventoryProps = {
  extended?: boolean
}

export function HospitalInventory({ extended = false }: HospitalInventoryProps) {
  const inventory = [
    {
      bloodType: "A+",
      units: 12,
      capacity: 20,
      status: "Normal",
      expiringUnits: 2,
    },
    {
      bloodType: "O+",
      units: 8,
      capacity: 20,
      status: "Low",
      expiringUnits: 1,
    },
    {
      bloodType: "B+",
      units: 15,
      capacity: 20,
      status: "Normal",
      expiringUnits: 0,
    },
    {
      bloodType: "AB+",
      units: 5,
      capacity: 10,
      status: "Normal",
      expiringUnits: 0,
    },
    {
      bloodType: "A-",
      units: 2,
      capacity: 10,
      status: "Critical",
      expiringUnits: 0,
    },
    {
      bloodType: "O-",
      units: 0,
      capacity: 10,
      status: "Critical",
      expiringUnits: 0,
    },
    {
      bloodType: "B-",
      units: 3,
      capacity: 10,
      status: "Low",
      expiringUnits: 1,
    },
    {
      bloodType: "AB-",
      units: 0,
      capacity: 5,
      status: "Critical",
      expiringUnits: 0,
    },
  ]

  const displayInventory = extended ? inventory : inventory.filter((item) => item.status !== "Normal").slice(0, 4)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {displayInventory.map((item) => (
          <div key={item.bloodType} className="rounded-lg border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#264653] text-white font-bold text-sm">
                  {item.bloodType}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.units} units</span>
                    <Badge
                      className={
                        item.status === "Critical"
                          ? "bg-[#B83227]"
                          : item.status === "Low"
                            ? "bg-orange-500"
                            : "bg-[#2A9D8F]"
                      }
                    >
                      {item.status === "Critical" && <AlertTriangle className="mr-1 h-3 w-3" />}
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Progress
              value={(item.units / item.capacity) * 100}
              className="h-2"
              indicatorClassName={
                item.status === "Critical" ? "bg-[#B83227]" : item.status === "Low" ? "bg-orange-500" : "bg-[#2A9D8F]"
              }
            />

            {item.expiringUnits > 0 && (
              <p className="mt-2 text-xs text-[#B83227]">{item.expiringUnits} unit(s) expiring within 7 days</p>
            )}

            {extended && (
              <div className="mt-3 flex gap-2">
                {item.status === "Critical" || item.status === "Low" ? (
                  <Button className="w-full bg-[#B83227] hover:bg-[#a12a22] text-white" size="sm">
                    Request Donors
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full">
                    Update Inventory
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <Link href="/hospital-dashboard/inventory">View Full Inventory</Link>
        </Button>
      )}
    </div>
  )
}
