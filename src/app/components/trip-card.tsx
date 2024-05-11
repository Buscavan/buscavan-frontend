import Image from 'next/image'

export function TripCard() {
  return (
    <div className="bg-zinc-300 rounded-lg w-40 h-40 flex items-center justify-center shadow-lg flex-shrink-0 pl-2">
      <Image
        src={'/van-placeholder2.png'}
        width={160}
        height={160}
        alt="Imagem da Viagem"
      />
    </div>
  )
}
