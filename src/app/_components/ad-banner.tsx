'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AdBanner() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY

      if (currentScroll > totalScroll * 0.8) {
        const newOpacity =
          1 - (currentScroll - totalScroll * 0.8) / (totalScroll * 0.2)
        setOpacity(newOpacity)
      } else {
        setOpacity(1)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{ opacity }}
      className="w-full h-14 bg-zinc-800 dark:bg-zinc-200 flex items-center fixed bottom-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
    >
      <div className="max-w-7xl w-full mx-auto flex items-center gap-3">
        <p className="flex-1 text-primary-foreground font-medium">
          Anuncie em nossa plataforma e entre pro time da Buscavan!
        </p>
        <div className="flex-1 flex justify-end items-center h-full">
          <Button
            size="sm"
            variant="secondary"
            disabled={opacity <= 0.5}
            asChild
          >
            <Link href="/auth/cadastro/motorista">Cadastrar Veículos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
