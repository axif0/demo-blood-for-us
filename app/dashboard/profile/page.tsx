import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45] text-white">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src="/kamal.png?height=128&width=128"
                alt="Profile"
              />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Upload New
              </Button>
              <Button variant="outline" size="sm" className="text-[#B83227]">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Kamal Hossain" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select defaultValue="O+">
                  <SelectTrigger id="bloodGroup">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+880 1234 567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="kamal@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" defaultValue="1990-05-15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue="male">
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                defaultValue="123 Main Street, Mirpur, Dhaka"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Health & Lifestyle Information</CardTitle>
            <CardDescription>
              This information helps match you with appropriate donation
              requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" type="number" defaultValue="75" />
            </div>
            <div className="space-y-2">
              <Label>Do you smoke?</Label>
              <div className="flex items-center space-x-2">
                <Switch id="smoker" />
                <Label htmlFor="smoker">Yes, I smoke</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Do you have any chronic diseases?</Label>
              <div className="flex items-center space-x-2">
                <Switch id="chronic" />
                <Label htmlFor="chronic">Yes, I have chronic conditions</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications (if any)</Label>
              <Textarea
                id="medications"
                placeholder="List any medications you're currently taking"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastDonation">Last Donation Date</Label>
              <Input id="lastDonation" type="date" defaultValue="2024-07-30" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Donation Preferences</CardTitle>
            <CardDescription>
              Set your availability and notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Availability Status</Label>
              <Select defaultValue="available">
                <SelectTrigger>
                  <SelectValue placeholder="Set your availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">
                    Available for donation
                  </SelectItem>
                  <SelectItem value="unavailable">
                    Temporarily unavailable
                  </SelectItem>
                  <SelectItem value="emergency">
                    Available for emergencies only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Maximum Travel Distance</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue placeholder="Select maximum distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Up to 5 km</SelectItem>
                  <SelectItem value="10">Up to 10 km</SelectItem>
                  <SelectItem value="20">Up to 20 km</SelectItem>
                  <SelectItem value="50">Up to 50 km</SelectItem>
                  <SelectItem value="any">Any distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">Notification Preferences</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-app"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    App Notifications
                    <Badge className="bg-[#2A9D8F]">Enabled</Badge>
                  </Label>
                  <Switch id="notif-app" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-sms"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    SMS Notifications
                    <Badge className="bg-[#2A9D8F]">Enabled</Badge>
                  </Label>
                  <Switch id="notif-sms" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-email"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Email Notifications
                    <Badge variant="outline">Disabled</Badge>
                  </Label>
                  <Switch id="notif-email" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
