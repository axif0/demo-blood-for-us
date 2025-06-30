import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Upload, Building, Phone, Mail, Plus } from "lucide-react"

export default function HospitalProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Hospital Profile</h2>
          <p className="text-muted-foreground">Manage your hospital information and settings</p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Hospital Logo</CardTitle>
            <CardDescription>Update your hospital logo</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
              <Building className="h-full w-full p-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <Button variant="outline" size="sm" className="text-[#B83227]">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Hospital Information</CardTitle>
            <CardDescription>Update your hospital details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input id="hospitalName" defaultValue="Dhaka Medical College Hospital" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalId">Hospital Registration ID</Label>
                <Input id="hospitalId" defaultValue="DMCH-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+880 1234 567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="info@dmch.gov.bd" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" type="url" defaultValue="https://dmch.gov.bd" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Hospital Type</Label>
                <Select defaultValue="government">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select hospital type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                    <SelectItem value="specialized">Specialized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" defaultValue="100 Ramna, Dhaka 1000, Bangladesh" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Blood Donation Center</CardTitle>
            <CardDescription>Information about your blood donation facilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="centerName">Donation Center Name</Label>
              <Input id="centerName" defaultValue="DMCH Blood Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="centerLocation">Location within Hospital</Label>
              <Input id="centerLocation" defaultValue="2nd Floor, Building B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monday - Friday</span>
                  <Input className="w-40" defaultValue="8:00 AM - 5:00 PM" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Saturday</span>
                  <Input className="w-40" defaultValue="9:00 AM - 2:00 PM" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sunday</span>
                  <Input className="w-40" defaultValue="Closed" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Daily Donation Capacity</Label>
              <Input id="capacity" type="number" defaultValue="50" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Contact Persons</CardTitle>
            <CardDescription>Add contact persons for blood donation coordination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dr. Ahmed Khan</h4>
                  <p className="text-sm text-muted-foreground">Blood Bank Director</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-[#B83227]">
                  Remove
                </Button>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+880 1234 567891</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>ahmed.khan@dmch.gov.bd</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Fatima Rahman</h4>
                  <p className="text-sm text-muted-foreground">Blood Donation Coordinator</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-[#B83227]">
                  Remove
                </Button>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+880 1234 567892</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>fatima.rahman@dmch.gov.bd</span>
                </div>
              </div>
            </div>

            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact Person
            </Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-6">
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Your hospital verification status and documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Hospital License</h3>
                  <Badge className="bg-[#2A9D8F]">Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Your hospital license has been verified by our team.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Document
                </Button>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4 rounded-lg border p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Blood Bank License</h3>
                  <Badge className="bg-[#2A9D8F]">Verified</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Your blood bank license has been verified by our team.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View Document
                </Button>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
