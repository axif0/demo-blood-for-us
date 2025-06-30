import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Droplet,
  Award,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const notifications = [
    {
      id: "notif-001",
      title: "New blood request nearby",
      description:
        "There's a critical blood request for A+ blood type within 2.5 km of your location.",
      time: "5 minutes ago",
      type: "request",
      read: false,
      urgent: true,
      href: "/dashboard/requests/343534634",
    },
    {
      id: "notif-002",
      title: "You earned a new badge!",
      description:
        "Congratulations! You've earned the 'Emergency Hero' badge for donating in an emergency situation.",
      time: "2 hours ago",
      type: "achievement",
      read: false,
      urgent: false,
      href: "/dashboard/notifications",
    },
    {
      id: "notif-003",
      title: "Your donation was completed",
      description:
        "Thank you for your donation at United Hospital. You've potentially saved 3 lives!",
      time: "1 day ago",
      type: "donation",
      read: true,
      urgent: false,
      href: "/dashboard/notifications/donation/3534535",
    },
    {
      id: "notif-004",
      title: "Health report available",
      description:
        "Your blood donation checkup report from September 15 is now available.",
      time: "2 days ago",
      type: "health",
      read: true,
      urgent: false,
      href: "/dashboard/health-records/health-report/3534535",
    },
    {
      id: "notif-005",
      title: "You're now eligible to donate",
      description:
        "It's been 3 months since your last donation. You're now eligible to donate again!",
      time: "3 days ago",
      type: "system",
      read: true,
      urgent: false,
      href: "/dashboard/requests",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with blood requests, achievements, and more
          </p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg border p-4 ${
                      notification.read
                        ? ""
                        : "bg-[#F9F9F9] border-l-4 border-l-[#B83227]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          notification.type === "request"
                            ? "bg-[#B83227] text-white"
                            : notification.type === "achievement"
                            ? "bg-[#2A9D8F] text-white"
                            : notification.type === "donation"
                            ? "bg-[#264653] text-white"
                            : notification.type === "health"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {notification.type === "request" ? (
                          <Droplet className="h-5 w-5" />
                        ) : notification.type === "achievement" ? (
                          <Award className="h-5 w-5" />
                        ) : notification.type === "donation" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : notification.type === "health" ? (
                          <FileText className="h-5 w-5" />
                        ) : (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2">
                            {notification.title}
                            {notification.urgent && (
                              <Badge className="bg-[#B83227]">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Urgent
                              </Badge>
                            )}
                            {!notification.read && (
                              <Badge className="bg-blue-500">New</Badge>
                            )}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                        <div className="mt-2 flex gap-2">
                          {notification.type === "request" && (
                            <>
                              <Link href={notification.href}>
                                <Button
                                  className="bg-[#B83227] hover:bg-[#a12a22] text-white"
                                  size="sm"
                                >
                                  View Request
                                </Button>
                              </Link>
                              {notification.urgent && (
                                <Button variant="outline" size="sm">
                                  Accept
                                </Button>
                              )}
                            </>
                          )}
                          {notification.type === "achievement" && (
                            <Link href={notification.href}>
                              <Button
                                className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white"
                                size="sm"
                              >
                                View Badge
                              </Button>
                            </Link>
                          )}
                          {notification.type === "donation" && (
                            <Link href={notification.href}>
                              <Button
                                className="bg-[#264653] hover:bg-[#1e3a45] text-white"
                                size="sm"
                              >
                                View Details
                              </Button>
                            </Link>
                          )}
                          {notification.type === "health" && (
                            <Link href={notification.href}>
                              <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                size="sm"
                              >
                                View Report
                              </Button>
                            </Link>
                          )}
                          {notification.type === "system" && (
                            <Link href={notification.href}>
                              <Button
                                className="bg-[#264653] hover:bg-[#1e3a45] text-white"
                                size="sm"
                              >
                                Find Requests
                              </Button>
                            </Link>
                          )}
                          {!notification.read && (
                            <Button variant="outline" size="sm">
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-lg border p-4 bg-[#F9F9F9] border-l-4 border-l-[#B83227]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`rounded-full p-2 ${
                            notification.type === "request"
                              ? "bg-[#B83227] text-white"
                              : notification.type === "achievement"
                              ? "bg-[#2A9D8F] text-white"
                              : notification.type === "donation"
                              ? "bg-[#264653] text-white"
                              : notification.type === "health"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {notification.type === "request" ? (
                            <Droplet className="h-5 w-5" />
                          ) : notification.type === "achievement" ? (
                            <Award className="h-5 w-5" />
                          ) : notification.type === "donation" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : notification.type === "health" ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <Bell className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              {notification.title}
                              {notification.urgent && (
                                <Badge className="bg-[#B83227]">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  Urgent
                                </Badge>
                              )}
                              <Badge className="bg-blue-500">New</Badge>
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <div className="mt-2 flex gap-2">
                            {notification.type === "request" && (
                              <>
                                <Button
                                  className="bg-[#B83227] hover:bg-[#a12a22] text-white"
                                  size="sm"
                                >
                                  View Request
                                </Button>
                                {notification.urgent && (
                                  <Button variant="outline" size="sm">
                                    Accept
                                  </Button>
                                )}
                              </>
                            )}
                            {notification.type === "achievement" && (
                              <Button
                                className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white"
                                size="sm"
                              >
                                View Badge
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "request")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 ${
                        notification.read
                          ? ""
                          : "bg-[#F9F9F9] border-l-4 border-l-[#B83227]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-[#B83227] text-white">
                          <Droplet className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              {notification.title}
                              {notification.urgent && (
                                <Badge className="bg-[#B83227]">
                                  <AlertTriangle className="mr-1 h-3 w-3" />
                                  Urgent
                                </Badge>
                              )}
                              {!notification.read && (
                                <Badge className="bg-blue-500">New</Badge>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              className="bg-[#B83227] hover:bg-[#a12a22] text-white"
                              size="sm"
                            >
                              View Request
                            </Button>
                            {notification.urgent && (
                              <Button variant="outline" size="sm">
                                Accept
                              </Button>
                            )}
                            {!notification.read && (
                              <Button variant="outline" size="sm">
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "achievement")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 ${
                        notification.read
                          ? ""
                          : "bg-[#F9F9F9] border-l-4 border-l-[#B83227]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-[#2A9D8F] text-white">
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <Badge className="bg-blue-500">New</Badge>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {notification.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white"
                              size="sm"
                            >
                              View Badge
                            </Button>
                            {!notification.read && (
                              <Button variant="outline" size="sm">
                                Mark as Read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
