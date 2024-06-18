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
        <NavLink href="/app/settings" active={isActive('/app/settings')}>
          Perfil
        </NavLink>
        <NavLink
          href="/app/settings/driver"
          active={isActive('/app/settings/driver')}
        >
          Motorista
        </NavLink>
      </nav>
    </aside>
  )
}
