import { Metadata } from 'next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Início',
}

export default function Inicio() {
  return (
    <>
      <section className="w-full h-96 mt-16 bg-banner bg-center bg-cover flex items-center">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center gap-12">
          <div className="space-y-6 text-white text-center">
            <h1 className="font-bold text-6xl">
              Encontre suas próximas férias perfeitas
            </h1>
            <p className="font-medium text-zinc-300">
              Explore lugares incríveis com família ou amigos e reserve sua
              viajem com facilidade.
            </p>
          </div>

          {/* Componentizar */}
          <form
            action=""
            className="w-full flex items-center justify-center gap-3"
          >
            <Input
              placeholder="Para onde deseja ir?"
              className="max-w-80 w-full bg-zinc-50"
            />

            <Button className="bg-zinc-700 hover:bg-zinc-700/90">
              <Search className="size-4 mr-2" /> Pesquisar
            </Button>
          </form>
        </div>
      </section>

      <section className="max-w-7xl w-full mx-auto py-[5rem] flex justify-center items-center gap-8">
        <div className="w-1/2 h-64 bg-zinc-300 rounded-xl" />

        <div className="w-1/2 space-y-4">
          <Badge>Quem somos?</Badge>
          <h1 className="font-bold text-3xl">
            Agência de viagens de confiança
          </h1>
          <p className="text-muted-foreground">
            Somos uma equipe apaixonada por viagens que se dedica a oferecer a
            melhor experiência para nossos clientes. Nosso objetivo é tornar a
            reserva de férias um processo fácil e prazeroso.
          </p>
        </div>
      </section>

      <section className="w-full py-[5rem] flex items-center bg-zinc-200">
        <div className="max-w-7xl w-full mx-auto flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-4">
            <Badge>Destinos populares</Badge>
            <h1 className="font-bold text-3xl">Explore os melhores destinos</h1>
            <p className="text-muted-foreground">
              Descubra os lugares mais incríveis e reserve sua próxima aventura
              conosco.
            </p>
          </div>

          <div className="w-full grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-lg overflow-hidden">
                <div className="h-40 bg-zinc-100" />
                <div className="p-4 bg-background">
                  <h5 className="font-semibold">Nome da Cidade</h5>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Descrição
                  </p>
                  <Button size="sm" className="mt-4">
                    Reservar agora
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
