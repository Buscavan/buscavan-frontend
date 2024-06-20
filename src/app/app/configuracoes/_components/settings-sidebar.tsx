'use client'

import { usePathname } from 'next/navigation'
import { NavLink } from './nav-link'

export function SettingsSidebar() {
  const pathname = usePathname()

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
        <NavLink
          href="/app/configuracoes/motorista"
          active={isActive('/app/configuracoes/motorista')}
        >
          Motorista
        </NavLink>
      </nav>
    </aside>
  )
}
