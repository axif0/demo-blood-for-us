import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Plus, RefreshCw, Download, Filter } from "lucide-react"

export default function BloodInventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blood Inventory</h2>
          <p className="text-muted-foreground">
            Manage your hospital's blood supply
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Update
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-[#264653] hover:bg-[#1e3a45]">
            <Plus className="mr-2 h-4 w-4" />
            Add Units
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Blood Units
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">187</div>
            <p className="text-xs text-muted-foreground">+12 units this week</p>
            <Progress className="mt-2" value={65} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B83227]">3</div>
            <p className="text-xs text-muted-foreground">
              Blood types below threshold
            </p>
            <Progress
              className="mt-2"
              value={25}
              indicatorColor="bg-[#B83227]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#E76F51]">15</div>
            <p className="text-xs text-muted-foreground">
              Units expiring in 7 days
            </p>
            <Progress
              className="mt-2"
              value={40}
              indicatorColor="bg-[#E76F51]"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Donations Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2A9D8F]">8</div>
            <p className="text-xs text-muted-foreground">
              +3 compared to yesterday
            </p>
            <Progress
              className="mt-2"
              value={80}
              indicatorColor="bg-[#2A9D8F]"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blood Inventory Status</CardTitle>
          <CardDescription>
            Current blood supply levels by blood type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-4">
            {/* A+ */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    A+
                  </div>
                  <span className="font-medium">A Positive</span>
                </div>
                <Badge className="bg-[#2A9D8F]">Adequate</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">32 units</span>
                  <span className="text-muted-foreground">Target: 30</span>
                </div>
                <Progress value={107} indicatorColor="bg-[#2A9D8F]" />
              </div>
            </div>

            {/* A- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    A-
                  </div>
                  <span className="font-medium">A Negative</span>
                </div>
                <Badge className="bg-[#E76F51]">Low</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">8 units</span>
                  <span className="text-muted-foreground">Target: 15</span>
                </div>
                <Progress value={53} indicatorColor="bg-[#E76F51]" />
              </div>
            </div>

            {/* B+ */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    B+
                  </div>
                  <span className="font-medium">B Positive</span>
                </div>
                <Badge className="bg-[#2A9D8F]">Adequate</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">28 units</span>
                  <span className="text-muted-foreground">Target: 25</span>
                </div>
                <Progress value={112} indicatorColor="bg-[#2A9D8F]" />
              </div>
            </div>

            {/* B- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    B-
                  </div>
                  <span className="font-medium">B Negative</span>
                </div>
                <Badge className="bg-[#E76F51]">Low</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">6 units</span>
                  <span className="text-muted-foreground">Target: 10</span>
                </div>
                <Progress value={60} indicatorColor="bg-[#E76F51]" />
              </div>
            </div>

            {/* AB+ */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    AB+
                  </div>
                  <span className="font-medium">AB Positive</span>
                </div>
                <Badge className="bg-[#2A9D8F]">Adequate</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">15 units</span>
                  <span className="text-muted-foreground">Target: 15</span>
                </div>
                <Progress value={100} indicatorColor="bg-[#2A9D8F]" />
              </div>
            </div>

            {/* AB- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    AB-
                  </div>
                  <span className="font-medium">AB Negative</span>
                </div>
                <Badge className="bg-[#B83227]">Critical</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">2 units</span>
                  <span className="text-muted-foreground">Target: 8</span>
                </div>
                <Progress value={25} indicatorColor="bg-[#B83227]" />
              </div>
            </div>

            {/* O+ */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    O+
                  </div>
                  <span className="font-medium">O Positive</span>
                </div>
                <Badge className="bg-[#2A9D8F]">Adequate</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">45 units</span>
                  <span className="text-muted-foreground">Target: 40</span>
                </div>
                <Progress value={112} indicatorColor="bg-[#2A9D8F]" />
              </div>
            </div>

            {/* O- */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                    O-
                  </div>
                  <span className="font-medium">O Negative</span>
                </div>
                <Badge className="bg-[#B83227]">Critical</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">5 units</span>
                  <span className="text-muted-foreground">Target: 20</span>
                </div>
                <Progress value={25} indicatorColor="bg-[#B83227]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Units</TabsTrigger>
          <TabsTrigger value="critical">Critical Levels</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Blood Units</CardTitle>
                <CardDescription>
                  Complete inventory of all blood units
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg overflow-hidden border">
                <div className="bg-[#264653] text-white p-4 grid grid-cols-12 text-sm font-medium">
                  <div className="col-span-1">ID</div>
                  <div className="col-span-2">Blood Type</div>
                  <div className="col-span-2">Collection Date</div>
                  <div className="col-span-2">Expiry Date</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-3">Notes</div>
                </div>

                <div className="divide-y">
                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-1">BU-1245</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#B83227]">A+</Badge>
                    </div>
                    <div className="col-span-2">May 10, 2024</div>
                    <div className="col-span-2">June 9, 2024</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      Regular donation
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-1">BU-1244</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#B83227]">O-</Badge>
                    </div>
                    <div className="col-span-2">May 9, 2024</div>
                    <div className="col-span-2">June 8, 2024</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      Universal donor
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-1">BU-1243</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#B83227]">B+</Badge>
                    </div>
                    <div className="col-span-2">May 8, 2024</div>
                    <div className="col-span-2">June 7, 2024</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#2A9D8F]">Available</Badge>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      First-time donor
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-1">BU-1242</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#B83227]">AB-</Badge>
                    </div>
                    <div className="col-span-2">April 20, 2024</div>
                    <div className="col-span-2">May 20, 2024</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#E76F51]">Expiring Soon</Badge>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-[#E76F51]" />
                        Expires in 5 days
                      </div>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-12 items-center">
                    <div className="col-span-1">BU-1241</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#B83227]">A-</Badge>
                    </div>
                    <div className="col-span-2">April 18, 2024</div>
                    <div className="col-span-2">May 18, 2024</div>
                    <div className="col-span-2">
                      <Badge className="bg-[#E76F51]">Expiring Soon</Badge>
                    </div>
                    <div className="col-span-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-[#E76F51]" />
                        Expires in 3 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 187 units
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-lg border p-4 bg-red-50">
                <div className="flex items-center gap-2 text-[#B83227]">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="font-medium">Critical Blood Types</h3>
                </div>
                <p className="mt-2 text-sm">
                  The following blood types are at critical levels. Consider
                  creating blood requests or contacting regular donors.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                        AB-
                      </div>
                      <div>
                        <h4 className="font-medium">AB Negative</h4>
                        <p className="text-sm text-muted-foreground">
                          2 units available (25% of target)
                        </p>
                      </div>
                    </div>
                    <Button className="bg-[#B83227] hover:bg-[#a12a22]">
                      Create Request
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                        O-
                      </div>
                      <div>
                        <h4 className="font-medium">O Negative</h4>
                        <p className="text-sm text-muted-foreground">
                          5 units available (25% of target)
                        </p>
                      </div>
                    </div>
                    <Button className="bg-[#B83227] hover:bg-[#a12a22]">
                      Create Request
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-lg border p-4 bg-amber-50">
                <div className="flex items-center gap-2 text-[#E76F51]">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="font-medium">Expiring Blood Units</h3>
                </div>
                <p className="mt-2 text-sm">
                  The following blood units are expiring within the next 7 days.
                  Consider prioritizing these units for use.
                </p>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                        AB-
                      </div>
                      <div>
                        <h4 className="font-medium">Unit ID: BU-1242</h4>
                        <p className="text-sm text-muted-foreground">
                          Expires on May 20, 2024 (5 days left)
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Allocate Unit</Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B83227] text-white font-bold">
                        A-
                      </div>
                      <div>
                        <h4 className="font-medium">Unit ID: BU-1241</h4>
                        <p className="text-sm text-muted-foreground">
                          Expires on May 18, 2024 (3 days left)
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Allocate Unit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Recently Added Units</h3>
                <p className="text-muted-foreground mt-2">
                  Blood units added in the last 7 days
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
