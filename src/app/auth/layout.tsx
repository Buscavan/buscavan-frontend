'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

export default function AuthLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const isRegisterPage = pathname.includes('/register')

  return (
    <div className="h-screen grid grid-cols-1 xl:grid-cols-2">
      {children}
      <section
        className={`hidden xl:block ${isRegisterPage ? 'bg-register' : 'bg-auth'} bg-cover`}
      />
    </div>
  )
}
