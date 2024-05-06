import { PropsWithChildren } from 'react'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header>Header</header>
      {children}
    </div>
  )
}
