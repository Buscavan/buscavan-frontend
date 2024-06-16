import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface VehicleCardProps extends HTMLAttributes<HTMLDivElement> {
  url?: string
  vehicleName: string
  description: string
  price: number
  date: string
}

export function VehicleCard({
  url,
  vehicleName,
  description,
  price,
  date,
  ...props
}: VehicleCardProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden" {...props}>
      {url ? (
        <Image
          src={url}
          width={1920}
          height={1080}
          alt="Imagem da Veículo"
          className="w-full h-40 object-cover object-center"
        />
      ) : (
        <div className="w-full h-40 bg-zinc-300" />
      )}
      <div className="p-4 bg-background">
        <h5 className="font-semibold">{vehicleName}</h5>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-between items-center gap-3">
          <b className="text-lg font-bold">R$ {price}</b>

          <Badge variant="outline">{date}</Badge>
        </div>
      </div>
    </div>
  )
}
