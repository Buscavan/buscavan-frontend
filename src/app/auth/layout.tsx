import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen p-20 flex justify-center items-center bg-zinc-200">
      <div className="max-w-7xl w-full max-h-fit h-max grid grid-cols-2 bg-background rounded-lg shadow-2xl">
        <section className="bg-auth bg-cover rounded-s-lg" />
        {children}
      </div>
    </div>
  )
}
