import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen grid grid-cols-1 xl:grid-cols-2">
      {children}
      <section className="hidden xl:block bg-auth bg-cover" />
    </div>
  )
}
