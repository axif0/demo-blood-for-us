"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Home,
  Droplet,
  FileText,
  Award,
  Settings,
  User,
  Bell,
  X,
  PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Icons } from "../icons"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Blood Requests",
      href: "/dashboard/requests",
      icon: Droplet,
    },
    {
      name: "Create Request",
      href: "/dashboard/requests/create",
      icon: Icons.plusCircle,
    },
    {
      name: "Health Records",
      href: "/dashboard/health-records",
      icon: FileText,
    },
    {
      name: "Leaderboard",
      href: "/dashboard/leaderboard",
      icon: Award,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#B83227]">
                    Blood For Us
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <nav className="flex flex-col gap-1 p-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === route.href
                        ? "bg-[#B83227] text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden w-[240px] flex-col border-r bg-white md:flex">
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-1 p-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === route.href
                    ? "bg-[#B83227] text-white"
                    : "hover:bg-muted"
                }`}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  )
}
