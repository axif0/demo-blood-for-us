import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Bell, Globe, Users, Lock, Plus } from "lucide-react"

export default function HospitalSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your hospital account settings and preferences</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#264653]" />
              Account Security
            </CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Primary Phone Number</Label>
              <div className="flex gap-2">
                <Input id="phone" defaultValue="+880 1234 567890" readOnly className="bg-muted" />
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-xs text-muted-foreground">Your phone number is used for login and verification</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Primary Email</Label>
              <div className="flex gap-2">
                <Input id="email" defaultValue="info@dmch.gov.bd" readOnly className="bg-muted" />
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-xs text-muted-foreground">Your email is used for notifications and recovery</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="flex items-center gap-2 cursor-pointer">
                  Two-Factor Authentication
                  <Badge variant="outline">Recommended</Badge>
                </Label>
                <Switch id="two-factor" defaultChecked />
              </div>
              <p className="text-xs text-muted-foreground">
                Receive a verification code via SMS when logging in from a new device
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-alerts" className="cursor-pointer">
                  Login Alerts
                </Label>
                <Switch id="login-alerts" defaultChecked />
              </div>
              <p className="text-xs text-muted-foreground">Receive alerts when your account is accessed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#264653]" />
              Staff Access
            </CardTitle>
            <CardDescription>Manage staff access to your hospital account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dr. Ahmed Khan</h4>
                  <p className="text-sm text-muted-foreground">Blood Bank Director</p>
                </div>
                <Badge className="bg-[#264653]">Admin</Badge>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Access
                </Button>
                <Button variant="outline" size="sm" className="text-[#B83227]">
                  Remove
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Fatima Rahman</h4>
                  <p className="text-sm text-muted-foreground">Blood Donation Coordinator</p>
                </div>
                <Badge className="bg-[#2A9D8F]">Staff</Badge>
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm">
                  Edit Access
                </Button>
                <Button variant="outline" size="sm" className="text-[#B83227]">
                  Remove
                </Button>
              </div>
            </div>

            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#264653]" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Blood Request Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-new-requests" className="cursor-pointer">
                    New Donor Responses
                  </Label>
                  <Switch id="notif-new-requests" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-critical" className="cursor-pointer">
                    Critical Inventory Levels
                  </Label>
                  <Switch id="notif-critical" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-expiring" className="cursor-pointer">
                    Expiring Blood Units
                  </Label>
                  <Switch id="notif-expiring" defaultChecked />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">Other Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-new-donors" className="cursor-pointer">
                    New Donors in Area
                  </Label>
                  <Switch id="notif-new-donors" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-appointments" className="cursor-pointer">
                    Donation Appointments
                  </Label>
                  <Switch id="notif-appointments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-system" className="cursor-pointer">
                    System Updates
                  </Label>
                  <Switch id="notif-system" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#264653]" />
              Language & Region
            </CardTitle>
            <CardDescription>Set your preferred language and region</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="en">English</option>
                <option value="bn">Bengali</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <select
                id="region"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
                <option value="rajshahi">Rajshahi</option>
                <option value="khulna">Khulna</option>
                <option value="barisal">Barisal</option>
                <option value="sylhet">Sylhet</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <select
                id="date-format"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="dd-mm-yyyy">DD-MM-YYYY</option>
                <option value="mm-dd-yyyy">MM-DD-YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#B83227]" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-[#B83227] p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-[#B83227]">Delete Hospital Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your hospital account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="destructive">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
