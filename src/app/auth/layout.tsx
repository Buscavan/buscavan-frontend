import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div>
      {children}
      <section>Banner</section>
    </div>
  )
}
