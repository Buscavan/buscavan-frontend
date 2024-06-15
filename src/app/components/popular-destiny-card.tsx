import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface PopularDestinyCardProps extends HTMLAttributes<HTMLDivElement> {
  url: string
  cityName: string
  description: string
}

export function PopularDestinyCard({
  url,
  cityName,
  description,
  ...props
}: PopularDestinyCardProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden" {...props}>
      <Image
        src={url}
        width={1920}
        height={1080}
        alt="Imagem da Cidade"
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4 bg-background">
        <h5 className="font-semibold">{cityName}</h5>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <Button size="sm" className="mt-4">
          Reservar agora
        </Button>
      </div>
    </div>
  )
}
