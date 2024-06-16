import { Label } from '@/components/ui/label'

interface AvatarHolderProps {
  label: string
  children: React.ReactNode
}

const AvatarHolder: React.FC<AvatarHolderProps> = ({ label, children }) => {
  return (
    <div className="grid flex-1 gap-2">
      <Label className="font-semibold">{label}</Label>
      {children}
    </div>
  )
}

export default AvatarHolder
