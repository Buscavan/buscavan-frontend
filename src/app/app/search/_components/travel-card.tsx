import { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { AlertCircle, CalendarDays, Users } from 'lucide-react'

type TravelCardGenericProps<T = unknown> = {
  className?: string
  children?: ReactNode
} & T

interface TravelCardProps extends ComponentProps<'div'> {}

export function TravelCard({ className, children, ...props }: TravelCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col border rounded-md overflow-hidden transition-all cursor-pointer hover:scale-[1.01]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface TravelCardImageProps {
  url?: string
}

export function TravelCardImage({ url }: TravelCardImageProps) {
  return url ? (
    <Image
      src={url}
      width={1920}
      height={1080}
      alt="Imagem da Cidade"
      className="w-full h-40 object-cover object-center"
    />
  ) : (
    <div className="w-full h-40 flex justify-center items-center bg-muted text-muted-foreground">
      <AlertCircle className="size-5 mr-2" />
      <span className="text-sm">Sem foto</span>
    </div>
  )
}

export function TravelCardContent({
  className,
  children,
}: TravelCardGenericProps) {
  return (
    <div className={cn('p-4 space-y-[1.125rem] bg-background', className)}>
      {children}
    </div>
  )
}

export function TravelCardHeader({
  className,
  children,
}: TravelCardGenericProps) {
  return (
    <header className={cn('flex items-center gap-3', className)}>
      {children}
    </header>
  )
}

export function TravelCardTitle({
  className,
  children,
}: TravelCardGenericProps) {
  return <h5 className={cn('font-medium', className)}>{children}</h5>
}

export function TravelCardPrice({
  className,
  children,
}: TravelCardGenericProps) {
  return (
    <b
      className={cn(
        'ml-auto text-xl font-bold text-green-600 dark:text-green-500',
        className,
      )}
    >
      {children}
    </b>
  )
}

interface TravelCardInfoProps {
  initialDate: string
  endDate: string
  passengers: number
}

export function TravelCardInfo({
  className,
  initialDate,
  endDate,
  passengers,
}: TravelCardGenericProps<TravelCardInfoProps>) {
  return (
    <div className={cn('flex items-center gap-6 text-sm', className)}>
      <div className="flex items-center">
        <CalendarDays className="size-4 mr-2 text-muted-foreground" />
        {initialDate} - {endDate}
      </div>
      <div className="flex items-center">
        <Users className="size-4 mr-2 text-muted-foreground" />
        {passengers} Passageiros
      </div>
    </div>
  )
}

export function TravelCardDescription({
  className,
  children,
}: TravelCardGenericProps) {
  return (
    <p className={cn('text-sm text-muted-foreground text-justify', className)}>
      {children}
    </p>
  )
}
