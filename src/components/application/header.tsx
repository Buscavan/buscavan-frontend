import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type HeaderGenericProps<T = unknown> = {
  className?: string
  children: ReactNode
} & T

export function Header({ className, children }: HeaderGenericProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full h-16 flex items-center bg-background border-b z-10',
        className,
      )}
    >
      {children}
    </header>
  )
}

export function HeaderContent({ className, children }: HeaderGenericProps) {
  return (
    <div
      className={cn(
        'max-w-7xl w-full mx-auto flex items-center gap-3',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function HeaderContentNav({ className, children }: HeaderGenericProps) {
  return (
    <div className={cn('flex-1 flex items-center gap-8', className)}>
      {children}
    </div>
  )
}

interface HeaderContentNavLinkProps {
  path: string
  active?: boolean
}

export function HeaderContentNavLink({
  path,
  active,
  className,
  children,
}: HeaderGenericProps<HeaderContentNavLinkProps>) {
  return (
    <Link
      href={path}
      className={cn(
        'flex items-center text-sm text-muted-foreground',
        active && 'text-primary font-medium',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function HeaderContentActions({
  className,
  children,
}: HeaderGenericProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>{children}</div>
  )
}
