import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen p-20 flex justify-center items-center bg-zinc-200">
      <div className="w-full h-full grid grid-cols-2 bg-background rounded-3xl shadow-2xl">
        {children}
        <section className="bg-auth bg-cover rounded-e-3xl" />
      </div>
    </div>
  )
}
