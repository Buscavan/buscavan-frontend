import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 pb-32">
      <div className="mb-8 w-32 h-32 relative">
        <Image
          src={'/buscavan.svg'}
          alt="Buscavan Logo"
          layout="fill"
          objectFit="contain"
          className="dark:invert"
        />
      </div>
      <h1 className="font-bold text-xl mb-4">404 - Página Não Encontrada</h1>
      <p className="font-light text-sm text-zinc-500 dark:text-zinc-300 mb-8">
        Oops! Parece que a página que você está procurando não existe.
      </p>
      <Link href="/">
        <Button type="submit" className="w-full">
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  )
}
