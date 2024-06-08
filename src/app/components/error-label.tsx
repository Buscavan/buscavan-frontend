import { ReactNode } from 'react'
import clsx from 'clsx'

interface ErrorLabelProps {
  children: ReactNode
  className?: string
}

export default function ErrorLabel({ children, className }: ErrorLabelProps) {
  return <p className={clsx('text-sm text-red-500', className)}>{children}</p>
}
