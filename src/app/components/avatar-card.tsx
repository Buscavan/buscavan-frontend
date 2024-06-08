import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AvatarCardProps {
  name: string
  fallback: string
  src: string
}

const AvatarCard: React.FC<AvatarCardProps> = ({ name, fallback, src }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <p className="text-sm text-zinc-700">{name}</p>
    </div>
  )
}

export default AvatarCard
