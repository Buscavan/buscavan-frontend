import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ErrorLabelProps {
  children: ReactNode
  className?: string
}

export default function ErrorLabel({ children, className }: ErrorLabelProps) {
  return <p className={cn('text-sm text-red-500', className)}>{children}</p>
}
