"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, authApi, tokenManager } from './api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenManager.getToken()
        const storedUser = tokenManager.getUser()

        if (token && storedUser) {
          // Verify token is still valid by fetching current user
          try {
            const response = await authApi.getProfile()
            if (response.success && response.data) {
              setUser(response.data.user)
              tokenManager.setUser(response.data.user) // Update stored user data
            } else {
              // Token is invalid, clear storage
              tokenManager.removeToken()
              setUser(null)
            }
          } catch (error) {
            // Token is invalid or expired
            tokenManager.removeToken()
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (token: string, userData: User) => {
    tokenManager.setToken(token)
    tokenManager.setUser(userData)
    setUser(userData)
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      tokenManager.removeToken()
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protecting routes
export function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83227] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      )
    }

    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
      return null
    }

    return <Component {...props} />
  }
}

// Hook for checking user role
export function useUserRole() {
  const { user } = useAuth()
  
  return {
    isIndividual: user?.user_type === 'individual',
    isHospital: user?.user_type === 'hospital',
    isDonor: user?.user_type === 'individual' && user?.role === 'donor',
    isSeeker: user?.user_type === 'individual' && user?.role === 'seeker',
    userType: user?.user_type,
    role: user?.role,
  }
} 