import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  path: string
}

export function Logo({ path }: LogoProps) {
  return (
    <Link href={path}>
      <Image src="/buscavan.svg" width={140} height={20} alt="Buscavan Logo" />
    </Link>
  )
}
