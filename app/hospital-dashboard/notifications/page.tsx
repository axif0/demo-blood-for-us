import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplet, FileText, CheckCircle, AlertTriangle, Calendar, User } from "lucide-react"

export default function HospitalNotificationsPage() {
  const notifications = [
    {
      id: "notif-001",
      title: "Donor accepted your request",
      description: "Kamal Hossain has accepted your request for O+ blood type.",
      time: "5 minutes ago",
      type: "request",
      read: false,
      urgent: true,
    },
    {
      id: "notif-002",
      title: "New donor registered in your area",
      description: "A new O- donor has registered within 5km of your hospital.",
      time: "2 hours ago",
      type: "donor",
      read: false,
      urgent: false,
    },
    {
      id: "notif-003",
      title: "Blood donation completed",
      description: "Fatima Khan has completed her donation of A+ blood type.",
      time: "1 day ago",
      type: "donation",
      read: true,
      urgent: false,
    },
    {
      id: "notif-004",
      title: "Inventory alert",
      description: "O- blood type is at critical level (0 units).",
      time: "2 days ago",
      type: "inventory",
      read: true,
      urgent: true,
    },
    {
      id: "notif-005",
      title: "Donation appointment scheduled",
      description: "Rahim Ahmed has scheduled a donation for tomorrow at 10:30 AM.",
      time: "3 days ago",
      type: "appointment",
      read: true,
      urgent: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with blood requests, donations, and more</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`rounded-lg border p-4 ${notification.read ? "" : "bg-[#F9F9F9] border-l-4 border-l-[#264653]"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`rounded-full p-2 ${
                          notification.type === "request"
                            ? "bg-[#B83227] text-white"
                            : notification.type === "donor"
                              ? "bg-[#2A9D8F] text-white"
                              : notification.type === "donation"
                                ? "bg-[#264653] text-white"
                                : notification.type === "inventory"
                                  ? "bg-orange-500 text-white"
                                  : "bg-blue-500 text-white"
                        }`}
                      >
                        {notification.type === "request" ? (
                          <Droplet className="h-5 w-5" />
                        ) : notification.type === "donor" ? (
                          <User className="h-5 w-5" />
                        ) : notification.type === "donation" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : notification.type === "inventory" ? (
                          <FileText className="h-5 w-5" />
                        ) : (
                          <Calendar className="h-5 w-5" />
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
                            {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                          </h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                        <div className="mt-2 flex gap-2">
                          {notification.type === "request" && (
                            <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                              View Request
                            </Button>
                          )}
                          {notification.type === "donor" && (
                            <Button className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white" size="sm">
                              View Donor
                            </Button>
                          )}
                          {notification.type === "donation" && (
                            <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                              View Details
                            </Button>
                          )}
                          {notification.type === "inventory" && (
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                              View Inventory
                            </Button>
                          )}
                          {notification.type === "appointment" && (
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white" size="sm">
                              View Schedule
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

        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="rounded-lg border p-4 bg-[#F9F9F9] border-l-4 border-l-[#264653]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`rounded-full p-2 ${
                            notification.type === "request"
                              ? "bg-[#B83227] text-white"
                              : notification.type === "donor"
                                ? "bg-[#2A9D8F] text-white"
                                : notification.type === "donation"
                                  ? "bg-[#264653] text-white"
                                  : notification.type === "inventory"
                                    ? "bg-orange-500 text-white"
                                    : "bg-blue-500 text-white"
                          }`}
                        >
                          {notification.type === "request" ? (
                            <Droplet className="h-5 w-5" />
                          ) : notification.type === "donor" ? (
                            <User className="h-5 w-5" />
                          ) : notification.type === "donation" ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : notification.type === "inventory" ? (
                            <FileText className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
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
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                          <div className="mt-2 flex gap-2">
                            {notification.type === "request" && (
                              <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                                View Request
                              </Button>
                            )}
                            {notification.type === "donor" && (
                              <Button className="bg-[#2A9D8F] hover:bg-[#238b7e] text-white" size="sm">
                                View Donor
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
                      className={`rounded-lg border p-4 ${notification.read ? "" : "bg-[#F9F9F9] border-l-4 border-l-[#264653]"}`}
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
                              {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                            </h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                          <div className="mt-2 flex gap-2">
                            <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                              View Request
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

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "donation")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 ${notification.read ? "" : "bg-[#F9F9F9] border-l-4 border-l-[#264653]"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-[#264653] text-white">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium flex items-center gap-2">
                              {notification.title}
                              {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                            </h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                          <div className="mt-2 flex gap-2">
                            <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white" size="sm">
                              View Details
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

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {notifications
                  .filter((notification) => notification.type === "inventory")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-lg border p-4 ${notification.read ? "" : "bg-[#F9F9F9] border-l-4 border-l-[#264653]"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-full p-2 bg-orange-500 text-white">
                          <FileText className="h-5 w-5" />
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
                              {!notification.read && <Badge className="bg-blue-500">New</Badge>}
                            </h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
                          <div className="mt-2 flex gap-2">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white" size="sm">
                              View Inventory
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
