"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle, Clock, Save, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { requestApi, handleApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useRouter, useParams } from "next/navigation"

export default function EditRequestPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const requestId = parseInt(params.id as string)
  
  const [saving, setSaving] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Form state
  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    units_needed: 1,
    urgency: "medium",
    required_by: "",
    hospital_name: "",
    hospital_address: "",
    hospital_city: "",
    hospital_area: "",
    contact_phone: "",
    description: "",
    status: "active"
  })

  // Load existing request data
  useEffect(() => {
    if (requestId) {
      loadRequestData()
    }
  }, [requestId])

  const loadRequestData = async () => {
    try {
      const response = await requestApi.getRequestById(requestId)
      
      if (response.success && response.data) {
        const request = response.data.request
        
        // Parse the hospital address back into components
        const addressParts = request.hospital_address.split(', ')
        const hospitalAddress = addressParts[0] || ''
        const hospitalArea = addressParts[1] || ''
        const hospitalCity = addressParts[2] || ''

        setFormData({
          patient_name: request.patient_name || "",
          blood_group: request.blood_group || "",
          units_needed: request.units_needed || 1,
          urgency: request.urgency || "medium",
          required_by: request.required_by ? request.required_by.split('T')[0] : "",
          hospital_name: request.hospital_name || "",
          hospital_address: hospitalAddress,
          hospital_city: hospitalCity,
          hospital_area: hospitalArea,
          contact_phone: request.contact_number || "",
          description: request.description || "",
          status: request.status || "active"
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to load request data",
          variant: "destructive",
        })
        router.push('/dashboard/requests')
      }
    } catch (error) {
      toast({
        title: "Error", 
        description: handleApiError(error),
        variant: "destructive",
      })
      router.push('/dashboard/requests')
    } finally {
      setInitialLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['patient_name', 'blood_group', 'hospital_name', 'hospital_address', 'contact_phone', 'required_by']
    
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

  const handleSaveChanges = async () => {
    if (!validateForm()) return

    setSaving(true)
    try {
      const updateData = {
        patient_name: formData.patient_name,
        blood_group: formData.blood_group,
        units_needed: formData.units_needed,
        urgency: formData.urgency as 'low' | 'medium' | 'high' | 'critical',
        hospital_name: formData.hospital_name,
        hospital_address: `${formData.hospital_address}, ${formData.hospital_area}, ${formData.hospital_city}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, ''),
        contact_number: formData.contact_phone,
        required_by: formData.required_by,
        description: formData.description,
        status: formData.status
      }

      const response = await requestApi.updateRequest(requestId, updateData)
      
      if (response.success) {
        toast({
          title: "Request Updated",
          description: "Your blood request has been updated successfully!",
        })
        router.push('/dashboard/requests')
      } else {
        toast({
          title: "Update Failed",
          description: response.message || "Failed to update request",
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

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#264653]"></div>
          <p className="mt-4 text-muted-foreground">Loading request data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard/requests')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Edit Blood Request</h2>
            <p className="text-muted-foreground">Update your blood request details</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>Update details about your blood request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input 
                id="patientName" 
                placeholder="Enter patient name"
                value={formData.patient_name}
                onChange={(e) => handleInputChange('patient_name', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blood Requirement</CardTitle>
            <CardDescription>Update the blood type and quantity needed</CardDescription>
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
            <CardDescription>Update details about the hospital where donation is needed</CardDescription>
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
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input 
                id="contactPhone" 
                placeholder="Enter contact phone number"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Update additional information about the request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <Label htmlFor="status">Request Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="fulfilled">Fulfilled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard/requests')}
        >
          Cancel
        </Button>
        <Button 
          className="bg-[#264653] hover:bg-[#1e3a45]"
          onClick={handleSaveChanges}
          disabled={saving}
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
} 