'use client'

import { usePathname } from 'next/navigation'
import { NavLink } from './nav-link'
import { useAuth } from '@/hooks/useAuth'

export function SettingsSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <aside>
      <nav className="flex flex-col">
        <NavLink
          href="/app/configuracoes"
          active={isActive('/app/configuracoes')}
        >
          Perfil
        </NavLink>
        {user && user.role && user.role === 'DRIVER' && (
          <NavLink
            href="/app/configuracoes/motorista"
            active={isActive('/app/configuracoes/motorista')}
          >
            Motorista
          </NavLink>
        )}
      </nav>
    </aside>
  )
}
