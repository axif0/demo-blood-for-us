import type React from "react"
import { HospitalSidebar } from "@/components/hospital/sidebar"
import { HospitalHeader } from "@/components/hospital/header"

export default function HospitalDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <HospitalHeader />
      <div className="flex flex-1">
        <HospitalSidebar />
        <main className="flex-1 p-6 bg-[#F9F9F9]">{children}</main>
      </div>
    </div>
  )
}
