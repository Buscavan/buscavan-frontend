import { PropsWithChildren } from 'react'
import { MainHeader } from './_components/main-header'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col bg-muted dark:bg-muted/10">
      <MainHeader />
      {children}
    </div>
  )
}
