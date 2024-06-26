'use client'

import {
  Header,
  HeaderContent,
  HeaderContentNav,
  HeaderContentNavLink,
  HeaderContentActions,
} from '@/components/application/header'
import { Logo } from '@/components/application/logo'
import { ModeToggle } from '@/components/application/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { MapPinned, Search, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'

export function MainHeader() {
  const pathname = usePathname()

  function isActive(path: string) {
    return pathname === path
  }

  return (
    <Header>
      <HeaderContent>
        <HeaderContentNav>
          <Logo path="/app" />

          <Separator orientation="vertical" className="h-3.5" />

          <HeaderContentNavLink path="/app" active={isActive('/app')}>
            <MapPinned className="size-4 mr-2" />
            Viagens
          </HeaderContentNavLink>
          <HeaderContentNavLink
            path="/app/explorar"
            active={isActive('/app/explorar')}
          >
            <Search className="size-4 mr-2" />
            Explorar
          </HeaderContentNavLink>
          <HeaderContentNavLink
            path="/app/configuracoes"
            active={isActive('/app/configuracoes')}
          >
            <User className="size-4 mr-2" />
            Perfil
          </HeaderContentNavLink>
        </HeaderContentNav>

        <HeaderContentActions>
          <ModeToggle />
          <UserDropdown />
        </HeaderContentActions>
      </HeaderContent>
    </Header>
  )
}
