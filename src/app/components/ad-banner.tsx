'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function AdBanner() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY

      // Adjust fade effect start point and rate here
      if (currentScroll > totalScroll * 0.8) {
        // Starts fading at 80% scroll
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
      className="w-full h-20 bg-zinc-800 px-32 py-4 flex justify-between items-center fixed bottom-0 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
    >
      <p className="flex-1 text-white font-medium text-lg">
        Anuncie em nossa plataforma e entre pro time da Buscavan!
      </p>
      <div className="flex-1 flex justify-end items-center h-full">
        <Button
          className="h-full"
          variant={'secondary'}
          disabled={opacity <= 0.5}
        >
          Cadastrar Veículos
        </Button>
      </div>
    </div>
  )
}
