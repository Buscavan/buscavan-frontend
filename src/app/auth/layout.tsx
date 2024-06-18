'use client'

import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'

export default function AuthLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  const isRegisterPage = pathname === '/auth/register'
  const isLoginPage = pathname === '/auth/login'
  const isPartnerPage = pathname === '/auth/register/partner'

  let backgroundClass = 'bg-login'

  if (isRegisterPage) {
    backgroundClass = 'bg-register'
  } else if (isLoginPage) {
    backgroundClass = 'bg-login'
  } else if (isPartnerPage) {
    backgroundClass = 'bg-partner'
  }

  return (
    <div className="h-screen grid grid-cols-1 xl:grid-cols-2">
      {children}
      <section
        className={`hidden xl:block ${backgroundClass} bg-cover bg-center`}
      />
    </div>
  )
}
