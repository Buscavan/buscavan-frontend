import { PropsWithChildren } from 'react'
import { Header } from '../components/header'
import Background from '../components/background'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <Background>{children}</Background>
    </div>
  )
}
