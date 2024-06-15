import { PropsWithChildren } from 'react'
import { MainHeader } from './_components/main-header'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      {children}
    </div>
  )
}
