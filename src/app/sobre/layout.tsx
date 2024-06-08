import { PropsWithChildren } from 'react'
import { Header } from '../components/header'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
