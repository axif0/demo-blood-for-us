"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, AlertTriangle, Clock, MapPin, User, Calendar, Phone, Plus, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { requestApi, handleApiError } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface BloodRequest {
  id: number
  patient_name: string
  blood_group: string
  units_needed: number
  urgency: 'low' | 'medium' | 'high' | 'critical'
  hospital_name: string
  hospital_address: string
  contact_number: string
  description?: string
  required_by: string
  status: string
  created_at: string
  requester_id: number
  distance?: string
}

export default function BloodRequestsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    blood_type: "",
    urgency: ""
  })

  // Request data state
  const [nearbyRequests, setNearbyRequests] = useState<BloodRequest[]>([])
  const [urgentRequests, setUrgentRequests] = useState<BloodRequest[]>([])
  const [acceptedRequests, setAcceptedRequests] = useState<BloodRequest[]>([])
  const [completedRequests, setCompletedRequests] = useState<BloodRequest[]>([])
  const [myRequests, setMyRequests] = useState<BloodRequest[]>([])

  const [acceptingRequestId, setAcceptingRequestId] = useState<number | null>(null)

  // Load data when component mounts
  useEffect(() => {
    loadNearbyRequests()
    loadUrgentRequests()
    loadAcceptedRequests()
    loadCompletedRequests()
    loadMyRequests()
  }, [])

  const loadNearbyRequests = async () => {
    try {
      const response = await requestApi.getNearbyRequests({
        location: user?.address,
        blood_group: user?.blood_group && user.blood_group !== 'any' ? user.blood_group : undefined,
        limit: 10
      })
      if (response.success && response.data) {
        setNearbyRequests(response.data.requests)
      }
    } catch (error) {
      console.error('Failed to load nearby requests:', error)
    }
  }

  const loadUrgentRequests = async () => {
    try {
      const response = await requestApi.getUrgentRequests({ limit: 10 })
      if (response.success && response.data) {
        setUrgentRequests(response.data.requests)
      }
    } catch (error) {
      console.error('Failed to load urgent requests:', error)
    }
  }

  const loadAcceptedRequests = async () => {
    try {
      const response = await requestApi.getAcceptedRequests({ limit: 10 })
      if (response.success && response.data) {
        setAcceptedRequests(response.data.requests)
      }
    } catch (error) {
      console.error('Failed to load accepted requests:', error)
    }
  }

  const loadCompletedRequests = async () => {
    try {
      const response = await requestApi.getCompletedRequests({ limit: 10 })
      if (response.success && response.data) {
        setCompletedRequests(response.data.requests)
      }
    } catch (error) {
      console.error('Failed to load completed requests:', error)
    }
  }

  const loadMyRequests = async () => {
    try {
      const response = await requestApi.getMyRequests({ limit: 20 })
      if (response.success && response.data) {
        setMyRequests(response.data.requests)
      }
    } catch (error) {
      console.error('Failed to load my requests:', error)
    }
  }

  const handleAcceptRequest = async (requestId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to accept requests",
        variant: "destructive",
      })
      return
    }

    setAcceptingRequestId(requestId)
    try {
      const response = await requestApi.acceptRequest(requestId)
      if (response.success) {
        toast({
          title: "Request Accepted",
          description: "You have successfully accepted this blood request!",
        })
        // Reload data to reflect changes
        loadNearbyRequests()
        loadUrgentRequests()
        loadAcceptedRequests()
      } else {
        toast({
          title: "Accept Failed",
          description: response.message || "Failed to accept request",
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
      setAcceptingRequestId(null)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    try {
      const response = await requestApi.getRequests({
        blood_group: searchFilters.blood_type && searchFilters.blood_type !== 'any' ? searchFilters.blood_type : undefined,
        urgency: searchFilters.urgency && searchFilters.urgency !== 'any' ? searchFilters.urgency : undefined,
        status: 'active',
        limit: 20
      })
      
      if (response.success && response.data) {
        setNearbyRequests(response.data.requests)
        toast({
          title: "Search Complete",
          description: `Found ${response.data.requests.length} blood requests`,
        })
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: handleApiError(error),
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-[#B83227] text-white'
      case 'high': return 'bg-[#E76F51] text-white'
      case 'medium': return 'bg-[#F4A261] text-white'
      case 'low': return 'bg-[#2A9D8F] text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeUntilRequired = (requiredBy: string) => {
    const required = new Date(requiredBy)
    const now = new Date()
    const diffInHours = Math.ceil((required.getTime() - now.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 0) return 'Overdue'
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.ceil(diffInHours / 24)}d`
  }

  const handleDeleteRequest = async (requestId: number) => {
    if (!confirm('Are you sure you want to delete this blood request?')) {
      return
    }

    try {
      const response = await requestApi.deleteRequest(requestId)
      if (response.success) {
        toast({
          title: "Request Deleted",
          description: "Your blood request has been deleted successfully",
        })
        // Reload my requests to reflect changes
        loadMyRequests()
      } else {
        toast({
          title: "Delete Failed",
          description: response.message || "Failed to delete request",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      })
    }
  }

  const RequestCard = ({ request, showAcceptButton = true, showStatusBadge = false, isMyRequest = false }: {
    request: BloodRequest
    showAcceptButton?: boolean
    showStatusBadge?: boolean
    isMyRequest?: boolean
  }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#264653] text-white font-bold text-sm">
                {request.blood_group}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{request.hospital_name}</h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{request.hospital_address.length > 30 ? `${request.hospital_address.substring(0, 30)}...` : request.hospital_address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Required by: {formatDate(request.required_by)}</span>
                  <span>•</span>
                  <span>{getTimeUntilRequired(request.required_by)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className={`text-xs px-2 py-1 rounded-full flex items-center ${getUrgencyColor(request.urgency)}`}>
                {request.urgency === 'critical' && <AlertTriangle className="mr-1 h-3 w-3" />}
                {request.urgency === 'high' && <Clock className="mr-1 h-3 w-3" />}
                {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
              </div>
              {showStatusBadge && (
                <div className="bg-[#2A9D8F] text-white text-xs px-2 py-1 rounded-full">
                  {request.status}
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span>Patient: {request.patient_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Units needed: {request.units_needed}</span>
            </div>
            {request.description && (
              <p className="text-muted-foreground text-xs mt-2">{request.description}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>{request.contact_number}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {showAcceptButton && !isMyRequest && (
              <Button 
                className="flex-1 bg-[#B83227] hover:bg-[#a12a22] text-white" 
                size="sm"
                onClick={() => handleAcceptRequest(request.id)}
                disabled={acceptingRequestId === request.id}
              >
                {acceptingRequestId === request.id ? "Accepting..." : "Accept Request"}
              </Button>
            )}
            {isMyRequest ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/requests/${request.id}/edit`)}
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteRequest(request.id)}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">Find and respond to blood requests in your area</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Requests</CardTitle>
          <CardDescription>Filter blood requests by location, blood type, and urgency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                placeholder="Enter location or distance"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select 
                value={searchFilters.blood_type} 
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, blood_type: value }))}
              >
                <SelectTrigger id="bloodType">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Compatible</SelectItem>
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
              <Label htmlFor="urgency">Urgency</Label>
              <Select 
                value={searchFilters.urgency} 
                onValueChange={(value) => setSearchFilters(prev => ({ ...prev, urgency: value }))}
              >
                <SelectTrigger id="urgency">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">Urgent</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-[#264653] hover:bg-[#1e3a45]"
                onClick={handleSearch}
                disabled={loading}
              >
                <Search className="mr-2 h-4 w-4" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="nearby" className="space-y-4">
        <TabsList>
          <TabsTrigger value="nearby">Nearby Requests ({nearbyRequests.length})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent Requests ({urgentRequests.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted by Me ({acceptedRequests.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedRequests.length})</TabsTrigger>
          <TabsTrigger value="my">My Requests ({myRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="space-y-4">
          <div className="grid gap-4">
            {nearbyRequests.length > 0 ? (
              nearbyRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground py-8">
                    <p>No nearby blood requests found.</p>
                    <p className="text-sm">Try adjusting your search filters or check back later.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <div className="grid gap-4">
            {urgentRequests.length > 0 ? (
              urgentRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
            <Card>
              <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground py-8">
                    <p>No urgent blood requests at the moment.</p>
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <div className="grid gap-4">
            {acceptedRequests.length > 0 ? (
              acceptedRequests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  showAcceptButton={false}
                  showStatusBadge={true}
                />
              ))
            ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground py-8">
                  <p>You haven't accepted any requests yet.</p>
                    <p className="text-sm">Browse nearby or urgent requests to help someone in need.</p>
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedRequests.length > 0 ? (
              completedRequests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  showAcceptButton={false}
                  showStatusBadge={true}
                />
              ))
            ) : (
            <Card>
              <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground py-8">
                    <p>No completed donations yet.</p>
                    <p className="text-sm">Your completed donations will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            )}
                  </div>
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          <div className="grid gap-4">
            {myRequests.length > 0 ? (
              myRequests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  showAcceptButton={false}
                  showStatusBadge={true}
                  isMyRequest={true}
                />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground py-8">
                    <p className="text-lg font-medium mb-2">No blood requests created yet</p>
                    <p className="text-sm mb-4">Create your first blood request to get started</p>
                    <Button 
                      className="bg-[#264653] hover:bg-[#1e3a45]"
                      onClick={() => router.push('/dashboard/requests/create')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Blood Request
                    </Button>
                </div>
              </CardContent>
            </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
