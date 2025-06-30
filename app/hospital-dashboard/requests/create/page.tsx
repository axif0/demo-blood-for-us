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
          <p className="text-muted-foreground">Create a new blood donation request for a patient</p>
        </div>
        <Button className="bg-[#264653] hover:bg-[#1e3a45]">
          <Send className="mr-2 h-4 w-4" />
          Publish Request
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Enter details about the patient requiring blood</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input id="patientId" placeholder="Enter patient ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name (Optional)</Label>
              <Input id="patientName" placeholder="Enter patient name" />
              <p className="text-xs text-muted-foreground">
                Patient name will not be publicly visible unless consent is given
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
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="icu">ICU</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="maternity">Maternity</SelectItem>
                  <SelectItem value="general">General</SelectItem>
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
              <Label>Donor Requirements</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="healthy" />
                  <Label htmlFor="healthy" className="cursor-pointer">
                    Must be healthy and meet standard donation criteria
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fasting" />
                  <Label htmlFor="fasting" className="cursor-pointer">
                    Should not be fasting
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="age" />
                  <Label htmlFor="age" className="cursor-pointer">
                    Age between 18-60 years
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weight" />
                  <Label htmlFor="weight" className="cursor-pointer">
                    Weight above 50kg
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contact Information</Label>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="useHospital" defaultChecked />
                  <Label htmlFor="useHospital" className="cursor-pointer">
                    Use hospital contact information
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="addContact" />
                  <Label htmlFor="addContact" className="cursor-pointer">
                    Add specific contact person for this request
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Privacy & Sharing</CardTitle>
            <CardDescription>Control how this request is shared and who can see it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup defaultValue="public" className="space-y-2">
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="cursor-pointer">
                    Public (Visible to all donors in the area)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="registered" id="registered" />
                  <Label htmlFor="registered" className="cursor-pointer">
                    Registered Donors Only (Only visible to verified donors)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="cursor-pointer">
                    Private (Only visible to donors you specifically invite)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Sharing Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="shareLocation" defaultChecked />
                  <Label htmlFor="shareLocation" className="cursor-pointer">
                    Share hospital location with donors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notifyNearby" defaultChecked />
                  <Label htmlFor="notifyNearby" className="cursor-pointer">
                    Send notifications to nearby donors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="shareOnSocial" />
                  <Label htmlFor="shareOnSocial" className="cursor-pointer">
                    Share on hospital social media accounts
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
