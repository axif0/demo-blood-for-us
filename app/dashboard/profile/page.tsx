"use client"

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
import { Save, Hospital, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { userApi, handleApiError } from "@/lib/api"

export default function ProfilePage() {
  const { user, login } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    hospital_name: "",
    hospital_id: "",
    phone_number: "",
    email: "",
    address: "",
    blood_group: "",
    date_of_birth: "",
    gender: "",
    weight: "",
    medications: "",
    last_donation: "",
    availability: "available",
    max_distance: "10",
    smoker: false,
    chronic_diseases: false,
    notifications: {
      app: true,
      sms: true,
      email: false
    }
  })

  // Initialize form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        hospital_name: user.hospital_name || "",
        hospital_id: user.hospital_id || "",
        phone_number: user.phone_number || "",
        email: user.email || "",
        address: user.address || "",
        blood_group: user.blood_group || "",
        date_of_birth: user.date_of_birth || "",
        gender: user.gender || "",
        weight: user.weight?.toString() || "",
        medications: user.medications || "",
        last_donation: user.last_donation || "",
        availability: user.availability || "available",
        max_distance: user.max_distance || "10",
        smoker: user.smoker || false,
        chronic_diseases: user.chronic_diseases || false,
      }))
    }
  }, [user])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Prepare update data - only include changed fields
      const updateData: any = {}
      
      if (user) {
        // Compare each field and only include changed ones
        if (formData.name !== (user.name || "")) updateData.name = formData.name
        if (formData.hospital_name !== (user.hospital_name || "")) updateData.hospital_name = formData.hospital_name
        if (formData.hospital_id !== (user.hospital_id || "")) updateData.hospital_id = formData.hospital_id
        if (formData.phone_number !== (user.phone_number || "")) updateData.phone_number = formData.phone_number
        if (formData.email !== (user.email || "")) updateData.email = formData.email
        if (formData.address !== (user.address || "")) updateData.address = formData.address
        if (formData.blood_group !== (user.blood_group || "")) updateData.blood_group = formData.blood_group
        if (formData.date_of_birth !== (user.date_of_birth || "")) updateData.date_of_birth = formData.date_of_birth
        if (formData.gender !== (user.gender || "")) updateData.gender = formData.gender
        if (formData.weight && formData.weight !== (user.weight?.toString() || "")) updateData.weight = parseInt(formData.weight)
        if (formData.medications !== (user.medications || "")) updateData.medications = formData.medications
        if (formData.last_donation !== (user.last_donation || "")) updateData.last_donation = formData.last_donation
        if (formData.availability !== (user.availability || "available")) updateData.availability = formData.availability
        if (formData.max_distance !== (user.max_distance || "10")) updateData.max_distance = formData.max_distance
        if (formData.smoker !== (user.smoker || false)) updateData.smoker = formData.smoker
        if (formData.chronic_diseases !== (user.chronic_diseases || false)) updateData.chronic_diseases = formData.chronic_diseases
      }

      // Only make API call if there are changes
      if (Object.keys(updateData).length === 0) {
        toast({
          title: "No Changes",
          description: "No changes were detected to save.",
        })
        return
      }

      const response = await userApi.updateProfile(updateData)
      
      if (response.success && response.data) {
        // Update the auth context with new user data
        const token = localStorage.getItem('blood_for_us_token')
        if (token) {
          login(token, response.data.user)
        }
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully!",
        })
      } else {
        toast({
          title: "Update Failed",
          description: response.message || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#264653] mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const userInitials = user.user_type === "hospital" 
    ? getInitials(user.hospital_name || "Hospital")
    : getInitials(user.name || "User")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <Button 
          className="bg-[#264653] hover:bg-[#1e3a45] text-white"
          onClick={handleSave}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage
                  src=""
                alt="Profile"
              />
                <AvatarFallback className="text-2xl bg-[#264653] text-white">
                  {userInitials}
                </AvatarFallback>
            </Avatar>
              <div className="absolute -bottom-2 -right-2">
                {user.user_type === "hospital" ? (
                  <div className="bg-blue-100 p-1 rounded-full">
                    <Hospital className="h-4 w-4 text-blue-600" />
                  </div>
                ) : (
                  <div className="bg-green-100 p-1 rounded-full">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <p className="font-medium text-lg">
                {user.user_type === "hospital" ? user.hospital_name : user.name}
              </p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge variant={user.verified ? "default" : "destructive"}>
                  {user.verified ? "Verified" : "Unverified"}
                </Badge>
                {user.user_type === "individual" && (
                  <Badge variant="outline" className="capitalize">
                    {user.role}
                  </Badge>
                )}
                {user.user_type === "hospital" && (
                  <Badge variant="outline">
                    Hospital
                  </Badge>
                )}
              </div>
            </div>
            
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
            <CardTitle>
              {user.user_type === "hospital" ? "Hospital Information" : "Personal Information"}
            </CardTitle>
            <CardDescription>
              {user.user_type === "hospital" 
                ? "Update your hospital details" 
                : "Update your personal details"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {user.user_type === "hospital" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input 
                      id="hospitalName" 
                      value={formData.hospital_name}
                      onChange={(e) => setFormData(prev => ({...prev, hospital_name: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalId">Hospital ID</Label>
                    <Input 
                      id="hospitalId" 
                      value={formData.hospital_id}
                      onChange={(e) => setFormData(prev => ({...prev, hospital_id: e.target.value}))}
                    />
                  </div>
                </>
              ) : (
                <>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    />
              </div>
                  {user.role === "donor" && (
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select 
                        value={formData.blood_group} 
                        onValueChange={(value) => setFormData(prev => ({...prev, blood_group: value}))}
                      >
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
                  )}
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone_number}
                  onChange={(e) => setFormData(prev => ({...prev, phone_number: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  placeholder="Enter your email"
                />
              </div>
              {user.user_type === "individual" && (
                <>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                      id="dob" 
                      type="date" 
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData(prev => ({...prev, date_of_birth: e.target.value}))}
                    />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}
                    >
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
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                placeholder="Enter your address"
              />
            </div>
          </CardContent>
        </Card>

        {user.user_type === "individual" && user.role === "donor" && (
          <>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Health & Lifestyle Information</CardTitle>
            <CardDescription>
                  This information helps match you with appropriate donation requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={formData.weight}
                    onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
                    placeholder="Enter your weight"
                  />
            </div>
            <div className="space-y-2">
              <Label>Do you smoke?</Label>
              <div className="flex items-center space-x-2">
                    <Switch 
                      id="smoker" 
                      checked={formData.smoker}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, smoker: checked}))}
                    />
                <Label htmlFor="smoker">Yes, I smoke</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Do you have any chronic diseases?</Label>
              <div className="flex items-center space-x-2">
                    <Switch 
                      id="chronic" 
                      checked={formData.chronic_diseases}
                      onCheckedChange={(checked) => setFormData(prev => ({...prev, chronic_diseases: checked}))}
                    />
                <Label htmlFor="chronic">Yes, I have chronic conditions</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications (if any)</Label>
              <Textarea
                id="medications"
                    value={formData.medications}
                    onChange={(e) => setFormData(prev => ({...prev, medications: e.target.value}))}
                placeholder="List any medications you're currently taking"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastDonation">Last Donation Date</Label>
                  <Input 
                    id="lastDonation" 
                    type="date" 
                    value={formData.last_donation}
                    onChange={(e) => setFormData(prev => ({...prev, last_donation: e.target.value}))}
                  />
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
                  <Select 
                    value={formData.availability} 
                    onValueChange={(value) => setFormData(prev => ({...prev, availability: value}))}
                  >
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
                  <Select 
                    value={formData.max_distance} 
                    onValueChange={(value) => setFormData(prev => ({...prev, max_distance: value}))}
                  >
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
                        <Badge className={formData.notifications.app ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                          {formData.notifications.app ? "Enabled" : "Disabled"}
                        </Badge>
                      </Label>
                      <Switch 
                        id="notif-app" 
                        checked={formData.notifications.app}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev, 
                          notifications: {...prev.notifications, app: checked}
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="notif-sms"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        SMS Notifications
                        <Badge className={formData.notifications.sms ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                          {formData.notifications.sms ? "Enabled" : "Disabled"}
                        </Badge>
                      </Label>
                      <Switch 
                        id="notif-sms" 
                        checked={formData.notifications.sms}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev, 
                          notifications: {...prev.notifications, sms: checked}
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="notif-email"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        Email Notifications
                        <Badge className={formData.notifications.email ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                          {formData.notifications.email ? "Enabled" : "Disabled"}
                        </Badge>
                      </Label>
                      <Switch 
                        id="notif-email" 
                        checked={formData.notifications.email}
                        onCheckedChange={(checked) => setFormData(prev => ({
                          ...prev, 
                          notifications: {...prev.notifications, email: checked}
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {(user.user_type === "hospital" || (user.user_type === "individual" && user.role === "seeker")) && (
          <Card className="md:col-span-6">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-app-general"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    App Notifications
                    <Badge className={formData.notifications.app ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                      {formData.notifications.app ? "Enabled" : "Disabled"}
                    </Badge>
                  </Label>
                  <Switch 
                    id="notif-app-general" 
                    checked={formData.notifications.app}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, app: checked}
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-sms-general"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    SMS Notifications
                    <Badge className={formData.notifications.sms ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                      {formData.notifications.sms ? "Enabled" : "Disabled"}
                    </Badge>
                  </Label>
                  <Switch 
                    id="notif-sms-general" 
                    checked={formData.notifications.sms}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, sms: checked}
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="notif-email-general"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    Email Notifications
                    <Badge className={formData.notifications.email ? "bg-[#2A9D8F]" : "bg-gray-400"}>
                      {formData.notifications.email ? "Enabled" : "Disabled"}
                    </Badge>
                  </Label>
                  <Switch 
                    id="notif-email-general" 
                    checked={formData.notifications.email}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev, 
                      notifications: {...prev.notifications, email: checked}
                    }))}
                  />
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </div>
  )
}
