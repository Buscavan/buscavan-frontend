import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type ApplicationPageGenericProps<T = unknown> = {
  className?: string
  children: ReactNode
} & T

export function ApplicationPage({
  className,
  children,
}: ApplicationPageGenericProps) {
  return (
    <main className={cn('mt-16 p-10 flex flex-col gap-10', className)}>
      {children}
    </main>
  )
}

export function ApplicationPageHeader({
  className,
  children,
}: ApplicationPageGenericProps) {
  return (
    <header
      className={cn('max-w-7xl w-full mx-auto flex items-center', className)}
    >
      {children}
    </header>
  )
}

export function ApplicationPageHeaderTitle({
  className,
  children,
}: ApplicationPageGenericProps) {
  return <h1 className={cn('text-3xl font-bold', className)}>{children}</h1>
}

export function ApplicationPageContent({
  className,
  children,
}: ApplicationPageGenericProps) {
  return (
    <main
      className={cn('max-w-7xl w-full mx-auto flex flex-col gap-3', className)}
    >
      {children}
    </main>
  )
}
