'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
  Dispatch,
  SetStateAction,
} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

interface User {
  email: string
  name: string
  cpf: string
  id: number
}

interface RegisterFormInputs {
  email: string
  nome: string
  cpf: string
  password: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterFormInputs) => Promise<void>
  logout: () => void
  getToken: () => string | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}): ReactElement => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const getToken = (): string | null => Cookies.get('token') || null

  const validateToken = async (refreshTokenToValidate: string) => {
    try {
      const response = await axios.post<{
        user: User
        token: string
        refresh_token: string
      }>(`${process.env.API_ENDPOINT}/auth/refreshToken`, {
        refreshToken: refreshTokenToValidate,
      })

      const { token, refresh_token: refreshToken, user } = response.data

      Cookies.set('token', token, { expires: 7 })
      Cookies.set('refreshToken', refreshToken, { expires: 14 })
      setUser(user)
    } catch (error) {
      Cookies.remove('token')
      Cookies.remove('refreshToken')
      setUser(null)
    }
  }

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    if (token) validateToken(token)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axios.post<{
        token: string
        refresh_token: string
        user: User
      }>(`${process.env.API_ENDPOINT}/auth/login`, {
        email,
        senha: password,
      })
      const { token, refresh_token: refreshToken, user } = response.data

      Cookies.set('token', token, { expires: 7 })
      Cookies.set('refreshToken', refreshToken, { expires: 14 })
      setUser(user)
    } catch (error) {
      toast({
        title: 'Login falhou',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
      throw new Error('Login failed')
    }
  }

  const register = async (data: RegisterFormInputs): Promise<void> => {
    try {
      const response = await axios.post<{
        token: string
        refresh_token: string
        user: User
      }>(`${process.env.API_ENDPOINT}/consumidor/registro`, data)
      const { token, refresh_token: refreshToken, user } = response.data

      Cookies.set('token', token, { expires: 7 })
      Cookies.set('refreshToken', refreshToken, { expires: 14 })
      setUser(user)
      toast({
        title: 'Registro efetuado com sucesso!',
        description: 'Sua conta foi criada com sucesso.',
      })
      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Falha no registro',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
      throw new Error('Registro falhou')
    }
  }

  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
    setUser(null)
    router.push('/login')
    toast({
      title: 'Logout realizado com sucesso!',
      description: 'Você foi desconectado.',
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, getToken, register, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
