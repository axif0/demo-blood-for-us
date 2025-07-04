"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Clock, Send, Save } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { requestApi, handleApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function CreateRequestPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    patient_type: "self",
    patient_name: "",
    age: "",
    gender: "",
    blood_group: "",
    units_needed: 1,
    urgency: "medium",
    required_by: "",
    hospital_name: "",
    hospital_address: "",
    hospital_city: "",
    hospital_area: "",
    contact_person: "",
    contact_phone: user?.phone_number || "",
    contact_email: "",
    reason: "",
    description: "",
    share_patient_name: true,
    share_reason: true,
    share_contact: true
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = [
      'patient_name', 'blood_group', 'hospital_name', 'hospital_address', 
      'contact_person', 'contact_phone', 'required_by'
    ]
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Validation Error",
          description: `${field.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} is required`,
          variant: "destructive",
        })
        return false
      }
    }

    // Validate required_by date is in the future
    const requiredByDate = new Date(formData.required_by)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (requiredByDate <= today) {
      toast({
        title: "Validation Error",
        description: "Required by date must be in the future",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSaveDraft = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to save draft",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const requestData = {
        patient_name: formData.patient_name,
        blood_group: formData.blood_group,
        units_needed: formData.units_needed,
        urgency: formData.urgency as 'low' | 'medium' | 'high' | 'critical',
        hospital_name: formData.hospital_name,
        hospital_address: `${formData.hospital_address}, ${formData.hospital_area}, ${formData.hospital_city}`,
        contact_number: formData.contact_phone,
        required_by: formData.required_by,
        description: formData.description
      }

      const response = await requestApi.saveDraft(requestData)
      
      if (response.success) {
        toast({
          title: "Draft Saved",
          description: "Your blood request has been saved as draft",
        })
        router.push('/dashboard/requests')
      } else {
        toast({
          title: "Save Failed",
          description: response.message || "Failed to save draft",
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
      setSaving(false)
    }
  }

  const handlePublishRequest = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to publish request",
        variant: "destructive",
      })
      return
    }

    if (!validateForm()) return

    setLoading(true)
    try {
      const requestData = {
        patient_name: formData.patient_name,
        blood_group: formData.blood_group,
        units_needed: formData.units_needed,
        urgency: formData.urgency as 'low' | 'medium' | 'high' | 'critical',
        hospital_name: formData.hospital_name,
        hospital_address: `${formData.hospital_address}, ${formData.hospital_area}, ${formData.hospital_city}`,
        contact_number: formData.contact_phone,
        required_by: formData.required_by,
        description: formData.description,
        status: 'active' as const
      }

      const response = await requestApi.createRequest(requestData)
      
      if (response.success) {
        toast({
          title: "Request Published",
          description: "Your blood request has been published successfully!",
        })
        router.push('/dashboard/requests')
      } else {
        toast({
          title: "Publish Failed",
          description: response.message || "Failed to publish request",
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

  // Set default required_by date to tomorrow
  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Blood Request</h2>
          <p className="text-muted-foreground">Request blood donation from donors in your area</p>
        </div>
        <Button 
          className="bg-[#264653] hover:bg-[#1e3a45]"
          onClick={handlePublishRequest}
          disabled={loading}
        >
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Publishing..." : "Publish Request"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>Enter details about your blood request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientType">Patient Type</Label>
              <RadioGroup 
                value={formData.patient_type} 
                onValueChange={(value) => handleInputChange('patient_type', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="self" id="self" />
                  <Label htmlFor="self" className="cursor-pointer">
                    For myself
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="relative" id="relative" />
                  <Label htmlFor="relative" className="cursor-pointer">
                    For a relative/friend
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input 
                id="patientName" 
                placeholder="Enter patient name"
                value={formData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be visible to donors who respond to your request
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="Enter patient age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleInputChange('gender', value)}
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blood Requirement</CardTitle>
            <CardDescription>Specify the blood type and quantity needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type Required *</Label>
              <Select 
                value={formData.blood_group} 
                onValueChange={(value) => handleInputChange('blood_group', value)}
                required
              >
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
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
              <Label htmlFor="units">Units Required</Label>
              <Input 
                id="units" 
                type="number" 
                min="1" 
                value={formData.units_needed}
                onChange={(e) => handleInputChange('units_needed', parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <RadioGroup 
                value={formData.urgency} 
                onValueChange={(value) => handleInputChange('urgency', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical" className="flex items-center cursor-pointer">
                    <AlertTriangle className="mr-2 h-4 w-4 text-[#B83227]" />
                    Critical (Immediate, within hours)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="high" id="urgent" />
                  <Label htmlFor="urgent" className="flex items-center cursor-pointer">
                    <Clock className="mr-2 h-4 w-4 text-[#E76F51]" />
                    Urgent (Within 24 hours)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="medium" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer">
                    Normal (Within 3 days)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredBy">Required By *</Label>
              <Input 
                id="requiredBy" 
                type="date" 
                value={formData.required_by}
                onChange={(e) => handleInputChange('required_by', e.target.value)}
                min={getTomorrowDate()}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Hospital Information</CardTitle>
            <CardDescription>Provide details about the hospital where donation is needed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital Name *</Label>
              <Input 
                id="hospitalName" 
                placeholder="Enter hospital name"
                value={formData.hospital_name}
                onChange={(e) => handleInputChange('hospital_name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospitalAddress">Hospital Address *</Label>
              <Textarea 
                id="hospitalAddress" 
                placeholder="Enter hospital address" 
                rows={2}
                value={formData.hospital_address}
                onChange={(e) => handleInputChange('hospital_address', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hospitalCity">City</Label>
                <Input 
                  id="hospitalCity" 
                  placeholder="Enter city"
                  value={formData.hospital_city}
                  onChange={(e) => handleInputChange('hospital_city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalArea">Area/District</Label>
                <Input 
                  id="hospitalArea" 
                  placeholder="Enter area or district"
                  value={formData.hospital_area}
                  onChange={(e) => handleInputChange('hospital_area', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input 
                id="contactPerson" 
                placeholder="Enter contact person name"
                value={formData.contact_person}
                onChange={(e) => handleInputChange('contact_person', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input 
                  id="contactPhone" 
                  placeholder="Enter contact phone number"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  placeholder="Enter contact email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Provide additional information about the request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Requirement</Label>
              <Select 
                value={formData.reason} 
                onValueChange={(value) => handleInputChange('reason', value)}
              >
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="accident">Accident/Trauma</SelectItem>
                  <SelectItem value="cancer">Cancer Treatment</SelectItem>
                  <SelectItem value="anemia">Severe Anemia</SelectItem>
                  <SelectItem value="childbirth">Childbirth Complications</SelectItem>
                  <SelectItem value="transplant">Organ Transplant</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Additional Details</Label>
              <Textarea
                id="description"
                placeholder="Provide any additional information that might be relevant for donors"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Privacy Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sharePatientName" 
                    checked={formData.share_patient_name}
                    onCheckedChange={(checked) => handleInputChange('share_patient_name', checked)}
                  />
                  <Label htmlFor="sharePatientName" className="cursor-pointer">
                    Share patient name with donors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="shareReason" 
                    checked={formData.share_reason}
                    onCheckedChange={(checked) => handleInputChange('share_reason', checked)}
                  />
                  <Label htmlFor="shareReason" className="cursor-pointer">
                    Share reason for blood requirement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="shareContact" 
                    checked={formData.share_contact}
                    onCheckedChange={(checked) => handleInputChange('share_contact', checked)}
                  />
                  <Label htmlFor="shareContact" className="cursor-pointer">
                    Share contact information with donors
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={handleSaveDraft}
          disabled={saving || loading}
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save as Draft"}
        </Button>
        <Button 
          className="bg-[#264653] hover:bg-[#1e3a45]"
          onClick={handlePublishRequest}
          disabled={loading || saving}
        >
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Publishing..." : "Publish Request"}
        </Button>
      </div>
    </div>
  )
}
