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
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'

interface User {
  fotoPerfilUrl?: string
  fotoCnhUrl?: string
  phone?: string
  email: string
  name: string
  role: string
  cpf: string
}

interface RegisterResponse {
  token: string
  refreshToken: string
  expiresIn: Date | number
  name: string
  role: string
  email: string
  cpf: string
  password: string
  updatedAt: string
  createdAt: string
}

interface LoginResponse {
  token: string
  refreshToken: string
  expiresIn: Date | number
  user: {
    cpf: string
    name: string
    role: string
    email: string
    password?: string
    updatedAt?: string
    createdAt?: string
    fotoCnhUrl?: string
    fotoPerfilUrl?: string
  }
}

interface LoginFormInputs {
  cpf: string
  password: string
}

interface RegisterFormInputs {
  email: string
  name: string
  cpf: string
  password: string
}

type Callback = (userCPF?: string) => void
interface AuthContextType {
  user: User | null
  login: (data: LoginFormInputs) => Promise<void>
  register: (data: RegisterFormInputs, callback?: Callback) => Promise<void>
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
      const response = await api.post<{
        user: User
        accessToken: string
        refreshToken: string
      }>(endpoints.validateRefreshToken, {
        refreshToken: refreshTokenToValidate,
      })

      const { refreshToken, user } = response.data

      // console.log(accessToken)
      // Cookies.set('token', accessToken, { expires: 7 })
      Cookies.set('refreshToken', refreshToken, { expires: 14 })
      setUser(user)
    } catch (error) {
      // Cookies.remove('token')
      // Cookies.remove('refreshToken')
      // setUser(null)
    }
  }

  useEffect(() => {
    const token = Cookies.get('refreshToken')
    if (token) validateToken(token)
  }, [])

  const login = async (data: LoginFormInputs): Promise<void> => {
    try {
      const response = await api.post<LoginResponse>(endpoints.login, data)
      const {
        token,
        refreshToken,
        expiresIn,
        user: { cpf, name, email, fotoCnhUrl, fotoPerfilUrl, role },
      } = response.data

      Cookies.set('token', token, { expires: expiresIn })
      Cookies.set('refreshToken', refreshToken, { expires: 14 })

      setUser({ name, email, cpf, fotoCnhUrl, fotoPerfilUrl, role })

      router.push('/app')
    } catch (error) {
      toast({
        title: 'Login falhou',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
      throw new Error('Login failed')
    }
  }

  const register = async (
    data: RegisterFormInputs,
    callback?: Callback,
  ): Promise<void> => {
    try {
      const response = await api.post<RegisterResponse>(
        endpoints.registerUser,
        data,
      )
      const { token, name, expiresIn, refreshToken, email, cpf, role } =
        response.data

      Cookies.set('token', token, { expires: expiresIn })
      Cookies.set('refreshToken', refreshToken, { expires: expiresIn })

      setUser({ name, email, cpf, role })

      toast({
        title: 'Registro efetuado com sucesso!',
        description: 'Sua conta foi criada com sucesso.',
      })

      if (callback) {
        callback(cpf)
      }

      router.push('/app')
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
    router.push('/auth/login')
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
