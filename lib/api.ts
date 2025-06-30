// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Types for API responses
export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: string
  errors?: Array<{ msg: string; param: string }>
}

export interface User {
  id: number
  name?: string
  hospital_name?: string
  hospital_id?: string
  phone_number: string
  user_type: 'individual' | 'hospital'
  role?: 'donor' | 'seeker'
  blood_group?: string
  address?: string
  email?: string
  date_of_birth?: string
  gender?: string
  weight?: number
  medications?: string
  last_donation?: string
  availability?: string
  max_distance?: string
  smoker?: boolean
  chronic_diseases?: boolean
  verified: boolean
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface UserStats {
  totalDonations: number
  totalRequests: number
  completedDonations: number
  fulfilledRequests: number
}

// Token management
export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('blood_for_us_token')
    }
    return null
  },
  
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blood_for_us_token', token)
    }
  },
  
  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blood_for_us_token')
      localStorage.removeItem('blood_for_us_user')
    }
  },
  
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('blood_for_us_user')
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },
  
  setUser: (user: User): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('blood_for_us_user', JSON.stringify(user))
    }
  }
}

// Generic API call function
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = tokenManager.getToken()
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }
    
    return data
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

// Authentication API calls
export const authApi = {
  // Register user
  register: async (userData: {
    phone_number: string
    user_type: 'individual' | 'hospital'
    name?: string
    role?: 'donor' | 'seeker'
    blood_group?: string
    hospital_name?: string
    hospital_id?: string
    address?: string
    password?: string
  }): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  // Send OTP
  sendOtp: async (phone_number: string): Promise<ApiResponse<{ phone_number: string; otp?: string }>> => {
    return apiCall<{ phone_number: string; otp?: string }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone_number }),
    })
  },

  // Login with OTP
  loginWithOtp: async (phone_number: string, otp: string): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>('/auth/login-otp', {
      method: 'POST',
      body: JSON.stringify({ phone_number, otp }),
    })
  },

  // Login with password
  login: async (phone_number: string, password?: string): Promise<ApiResponse<AuthResponse>> => {
    return apiCall<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone_number, password }),
    })
  },

  // Get current user profile
  getProfile: async (): Promise<ApiResponse<{ user: User; stats: UserStats }>> => {
    return apiCall<{ user: User; stats: UserStats }>('/auth/me')
  },

  // Change password
  changePassword: async (current_password: string, new_password: string): Promise<ApiResponse<any>> => {
    return apiCall<any>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password }),
    })
  },

  // Logout
  logout: async (): Promise<ApiResponse<any>> => {
    const response = await apiCall<any>('/auth/logout', {
      method: 'POST',
    })
    tokenManager.removeToken()
    return response
  }
}

// User API calls
export const userApi = {
  // Get donors
  getDonors: async (params?: {
    blood_group?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ donors: User[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.blood_group) searchParams.set('blood_group', params.blood_group)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ donors: User[]; pagination: any }>(`/users/donors${queryString ? `?${queryString}` : ''}`)
  },

  // Get hospitals
  getHospitals: async (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ hospitals: User[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ hospitals: User[]; pagination: any }>(`/users/hospitals${queryString ? `?${queryString}` : ''}`)
  },

  // Search donors (authenticated)
  searchDonors: async (params: {
    blood_group: string
    location?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ donors: User[]; filters: any; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    searchParams.set('blood_group', params.blood_group)
    if (params.location) searchParams.set('location', params.location)
    if (params.page) searchParams.set('page', params.page.toString())
    if (params.limit) searchParams.set('limit', params.limit.toString())
    
    return apiCall<{ donors: User[]; filters: any; pagination: any }>(`/users/search/donors?${searchParams.toString()}`)
  },

  // Update profile
  updateProfile: async (updateData: {
    name?: string
    hospital_name?: string
    hospital_id?: string
    phone_number?: string
    email?: string
    address?: string
    blood_group?: string
    date_of_birth?: string
    gender?: string
    weight?: number
    medications?: string
    last_donation?: string
    availability?: string
    max_distance?: string
    smoker?: boolean
    chronic_diseases?: boolean
  }): Promise<ApiResponse<{ user: User }>> => {
    return apiCall<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  },

  // Get user by ID
  getUserById: async (id: number): Promise<ApiResponse<{ user: User; stats?: UserStats }>> => {
    return apiCall<{ user: User; stats?: UserStats }>(`/users/${id}`)
  },

  // Get platform statistics
  getPlatformStats: async (): Promise<ApiResponse<{
    users: any
    requests: any
    donations: any
  }>> => {
    return apiCall<{
      users: any
      requests: any
      donations: any
    }>('/users/stats/overview')
  }
}

// Blood Request API calls
export const requestApi = {
  // Create blood request
  createRequest: async (requestData: {
    patient_name: string
    blood_group: string
    units_needed: number
    urgency: 'low' | 'medium' | 'high' | 'critical'
    hospital_name: string
    hospital_address: string
    contact_number: string
    required_by: string
    description?: string
    status?: 'draft' | 'active'
  }): Promise<ApiResponse<{ request: any }>> => {
    return apiCall<{ request: any }>('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
  },

  // Save request as draft
  saveDraft: async (requestData: {
    patient_name: string
    blood_group: string
    units_needed: number
    urgency: 'low' | 'medium' | 'high' | 'critical'
    hospital_name: string
    hospital_address: string
    contact_number: string
    required_by: string
    description?: string
  }): Promise<ApiResponse<{ request: any }>> => {
    return apiCall<{ request: any }>('/requests', {
      method: 'POST',
      body: JSON.stringify({ ...requestData, status: 'draft' }),
    })
  },

  // Publish a draft request
  publishRequest: async (requestId: number): Promise<ApiResponse<{ request: any }>> => {
    return apiCall<{ request: any }>(`/requests/${requestId}/publish`, {
      method: 'PUT',
    })
  },

  // Accept a blood request
  acceptRequest: async (requestId: number): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<{ message: string }>(`/requests/${requestId}/accept`, {
      method: 'POST',
    })
  },

  // Cancel request acceptance
  cancelAcceptance: async (requestId: number): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<{ message: string }>(`/requests/${requestId}/cancel-acceptance`, {
      method: 'POST',
    })
  },

  // Get nearby requests
  getNearbyRequests: async (params?: {
    location?: string
    radius?: number
    blood_group?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.location) searchParams.set('location', params.location)
    if (params?.radius) searchParams.set('radius', params.radius.toString())
    if (params?.blood_group) searchParams.set('blood_group', params.blood_group)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests/nearby${queryString ? `?${queryString}` : ''}`)
  },

  // Get urgent requests
  getUrgentRequests: async (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests/urgent${queryString ? `?${queryString}` : ''}`)
  },

  // Get requests accepted by current user
  getAcceptedRequests: async (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests/accepted${queryString ? `?${queryString}` : ''}`)
  },

  // Get completed requests
  getCompletedRequests: async (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests/completed${queryString ? `?${queryString}` : ''}`)
  },

  // Get all blood requests
  getRequests: async (params?: {
    blood_group?: string
    urgency?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.blood_group) searchParams.set('blood_group', params.blood_group)
    if (params?.urgency) searchParams.set('urgency', params.urgency)
    if (params?.status) searchParams.set('status', params.status)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests${queryString ? `?${queryString}` : ''}`)
  },

  // Get user's requests
  getMyRequests: async (params?: {
    status?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ requests: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.set('status', params.status)
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ requests: any[]; pagination: any }>(`/requests/user/mine${queryString ? `?${queryString}` : ''}`)
  },

  // Get request by ID
  getRequestById: async (id: number): Promise<ApiResponse<{ request: any }>> => {
    return apiCall<{ request: any }>(`/requests/${id}`)
  },

  // Update request
  updateRequest: async (id: number, updateData: {
    patient_name?: string
    blood_group?: string
    units_needed?: number
    urgency?: 'low' | 'medium' | 'high' | 'critical'
    hospital_name?: string
    hospital_address?: string
    contact_number?: string
    required_by?: string
    description?: string
    status?: string
  }): Promise<ApiResponse<{ request: any }>> => {
    return apiCall<{ request: any }>(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
  },

  // Delete request
  deleteRequest: async (id: number): Promise<ApiResponse<{ message: string }>> => {
    return apiCall<{ message: string }>(`/requests/${id}`, {
      method: 'DELETE',
    })
  }
}

// Donation API calls
export const donationApi = {
  // Schedule donation
  scheduleDonation: async (donationData: {
    request_id?: number
    hospital_name: string
    donation_date: string
    units_donated?: number
    notes?: string
  }): Promise<ApiResponse<{ donation: any }>> => {
    return apiCall<{ donation: any }>('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    })
  },

  // Get user's donations
  getMyDonations: async (params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<{ donations: any[]; pagination: any }>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    
    const queryString = searchParams.toString()
    return apiCall<{ donations: any[]; pagination: any }>(`/donations/user/mine${queryString ? `?${queryString}` : ''}`)
  }
}

// Error handling helper
export const handleApiError = (error: any): string => {
  if (error.message) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
} 