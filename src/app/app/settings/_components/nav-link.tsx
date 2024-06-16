import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type NavLinkProps = {
  href: string
  active?: boolean
  children: ReactNode
}

export function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn([
        'flex items-center text-sm px-3 py-2 rounded-md',
        active && 'bg-secondary',
      ])}
    >
      {children}
    </Link>
  )
}
