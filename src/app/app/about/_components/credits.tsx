import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import AvatarCard from './avatar-card'
import AvatarHolder from './avatar-holder'
import { Button } from '@/components/ui/button'

export default function Credits() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'}>Créditos</Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Projeto de Extensão</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-4">
          <AvatarHolder label="Coordenador">
            <AvatarCard
              name="Prof. Dr. Elvio Gilberto da Silva"
              fallback="EG"
              src="https://media.licdn.com/dms/image/C4D03AQHqjWJ2YfG_iw/profile-displayphoto-shrink_200_200/0/1566067483391?e=2147483647&v=beta&t=1FyXLaOWepRoSY4ADZZjOwVaGgDa_n4bXNLQ4k_cIC8"
            />
          </AvatarHolder>
          <AvatarHolder label="Professor Colaborador">
            <AvatarCard
              name="Prof. Dr. Elvio Gilberto da Silva"
              fallback="EG"
              src="https://media.licdn.com/dms/image/C4D03AQHqjWJ2YfG_iw/profile-displayphoto-shrink_200_200/0/1566067483391?e=2147483647&v=beta&t=1FyXLaOWepRoSY4ADZZjOwVaGgDa_n4bXNLQ4k_cIC8"
            />
          </AvatarHolder>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <AvatarHolder label="Equipe">
            <AvatarCard
              name="Arthur Marques de Oliveira"
              fallback="AM"
              src="https://github.com/arthurm9.png"
            />
            <AvatarCard
              name="João Erik da Silva Crisostomo"
              fallback="JE"
              src="https://github.com/joao-erik2077.png"
            />
            <AvatarCard
              name="Lucas Vieira da Silva"
              fallback="LV"
              src="https://github.com/lucasvieiras.png"
            />
            <AvatarCard
              name="Luiz Felipe Santana dos Santos"
              fallback="LF"
              src="https://github.com/felipesantana07.png"
            />
          </AvatarHolder>
          <AvatarHolder label="‎">
            <AvatarCard
              name="Matheus Henrique Crispim Cola"
              fallback="MH"
              src="https://github.com/matheuscola15.png"
            />
            <AvatarCard
              name="Pedro Henrique Vieira Ribeiro"
              fallback="PH"
              src="https://github.com/pedrohenriquevr.png"
            />
            <AvatarCard
              name="Richard Rodrigues da Silva"
              fallback="RR"
              src="https://github.com/souorichard.png"
            />
            <AvatarCard
              name="Vinicius Henrique Santos Pinto"
              fallback="VH"
              src="https://github.com/vihenrie.png"
            />
          </AvatarHolder>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid grid-cols-2 items-center min-h-12 w-full">
            <p className="w-full h-fit text-xs">Desenvolvimento:</p>
            <div className="w-full h-full bg-coordenadoriaExtensao bg-fit bg-center bg-no-repeat bg-white rounded-md"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid grid-cols-2 items-center min-h-12 w-full">
            <div className="w-full h-fit flex flex-start flex-col items-center">
              <p className="w-full text-xs">Apoio:</p>
              <p className="w-full text-xs text-zinc-700 dark:text-zinc-300">
                José Augusto Magalhães – Coordenador de Extensão
              </p>
            </div>
            <div className="w-1/2 h-full bg-unisagrado bg-fit bg-center bg-no-repeat bg-white rounded-md"></div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
