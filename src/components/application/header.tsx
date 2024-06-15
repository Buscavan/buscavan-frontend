import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HeaderGenericProps<T = unknown> = {
  className?: string
  children: ReactNode
} & T

export function Header({ className, children }: HeaderGenericProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full h-16 flex items-center bg-background border',
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

export function HeaderContentLogo({ className, children }: HeaderGenericProps) {
  return (
    <div className={cn('flex-1 flex items-center gap-3', className)}>
      {children}
    </div>
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
