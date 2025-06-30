import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Bell, Globe, Moon, Sun, Smartphone } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
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
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Input id="phone" defaultValue="+880 1234 567890" readOnly className="bg-muted" />
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-xs text-muted-foreground">Your phone number is used for login and verification</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="two-factor" className="flex items-center gap-2 cursor-pointer">
                  Two-Factor Authentication
                  <Badge variant="outline">Recommended</Badge>
                </Label>
                <Switch id="two-factor" />
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
            <Separator />
            <Button variant="destructive" className="w-full">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Delete Account
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
                  <Label htmlFor="notif-critical" className="cursor-pointer">
                    Critical Requests
                  </Label>
                  <Switch id="notif-critical" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-urgent" className="cursor-pointer">
                    Urgent Requests
                  </Label>
                  <Switch id="notif-urgent" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-normal" className="cursor-pointer">
                    Normal Requests
                  </Label>
                  <Switch id="notif-normal" defaultChecked />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">Other Notifications</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-achievements" className="cursor-pointer">
                    Achievements & Badges
                  </Label>
                  <Switch id="notif-achievements" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-health" className="cursor-pointer">
                    Health Reports
                  </Label>
                  <Switch id="notif-health" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-leaderboard" className="cursor-pointer">
                    Leaderboard Updates
                  </Label>
                  <Switch id="notif-leaderboard" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notif-news" className="cursor-pointer">
                    News & Announcements
                  </Label>
                  <Switch id="notif-news" />
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-[#264653]" />
              Appearance & Accessibility
            </CardTitle>
            <CardDescription>Customize the app appearance and accessibility settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base">Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" className="justify-start">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Button>
                <Button variant="outline" className="justify-start">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Button>
                <Button variant="outline" className="justify-start">
                  <div className="mr-2 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full">
                    <Sun className="h-4 w-4 dark:-mt-4" />
                    <Moon className="mt-4 h-4 w-4 dark:mt-0" />
                  </div>
                  System
                </Button>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label className="text-base">Accessibility</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="larger-text" className="cursor-pointer">
                    Larger Text
                  </Label>
                  <Switch id="larger-text" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="cursor-pointer">
                    High Contrast
                  </Label>
                  <Switch id="high-contrast" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-motion" className="cursor-pointer">
                    Reduce Motion
                  </Label>
                  <Switch id="reduce-motion" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
