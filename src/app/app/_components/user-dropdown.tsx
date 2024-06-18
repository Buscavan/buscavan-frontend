'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { ChevronDown, Info, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UserDropdown() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  const router = useRouter()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-40">
          {user ? user.name : 'Carregando...'}
          <ChevronDown
            className={cn('size-4 ml-3 transition-all', open && '-rotate-180')}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/app/settings')}>
            <User className="size-4 mr-2" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/app/about')}>
            <Info className="size-4 mr-2" />
            Sobre
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="bg-red-600 focus:bg-red-600/90 text-white focus:text-white"
        >
          <LogOut className="size-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
