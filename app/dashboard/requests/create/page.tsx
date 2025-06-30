import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Clock, Send } from "lucide-react"

export default function CreateRequestPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Create Blood Request</h2>
          <p className="text-muted-foreground">Request blood donation from donors in your area</p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45]">
          <Send className="mr-2 h-4 w-4" />
          Publish Request
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
              <RadioGroup defaultValue="self" className="space-y-2">
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
              <Label htmlFor="patientName">Patient Name</Label>
              <Input id="patientName" placeholder="Enter patient name" />
              <p className="text-xs text-muted-foreground">
                This will be visible to donors who respond to your request
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Enter patient age" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
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
              <Label htmlFor="bloodType">Blood Type Required</Label>
              <Select>
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
              <Input id="units" type="number" min="1" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <RadioGroup defaultValue="normal" className="space-y-2">
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical" className="flex items-center cursor-pointer">
                    <AlertTriangle className="mr-2 h-4 w-4 text-[#B83227]" />
                    Critical (Immediate, within hours)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="flex items-center cursor-pointer">
                    <Clock className="mr-2 h-4 w-4 text-[#E76F51]" />
                    Urgent (Within 24 hours)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer">
                    Normal (Within 3 days)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredBy">Required By</Label>
              <Input id="requiredBy" type="date" />
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
              <Label htmlFor="hospitalName">Hospital Name</Label>
              <Input id="hospitalName" placeholder="Enter hospital name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospitalAddress">Hospital Address</Label>
              <Textarea id="hospitalAddress" placeholder="Enter hospital address" rows={2} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hospitalCity">City</Label>
                <Input id="hospitalCity" placeholder="Enter city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalArea">Area/District</Label>
                <Input id="hospitalArea" placeholder="Enter area or district" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" placeholder="Enter contact person name" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" placeholder="Enter contact phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                <Input id="contactEmail" type="email" placeholder="Enter contact email" />
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
              <Select>
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
              />
            </div>
            <div className="space-y-2">
              <Label>Privacy Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sharePatientName" defaultChecked />
                  <Label htmlFor="sharePatientName" className="cursor-pointer">
                    Share patient name with donors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="shareReason" defaultChecked />
                  <Label htmlFor="shareReason" className="cursor-pointer">
                    Share reason for blood requirement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="shareContact" defaultChecked />
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
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-[#264653] hover:bg-[#1e3a45]">
          <Send className="mr-2 h-4 w-4" />
          Publish Request
        </Button>
      </div>
    </div>
  )
}
