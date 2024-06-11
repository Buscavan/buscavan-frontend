import { Metadata } from 'next'
import { SearchForm } from '../components/search-form'
import { TripCard } from '../components/trip-card'
import Section from '../components/section'
import Card from '../components/card'

export const metadata: Metadata = {
  title: 'Início',
}

export default function Inicio() {
  return (
    <>
      <section className="w-full h-96 bg-banner bg-center bg-cover flex items-center justify-between gap-16 py-16 px-32">
        <div className="max-w-[50%] w-full min-w-[30vw] h-full flex flex-col items-start justify-center text-white text-left gap-4">
          <h1 className="font-bold text-5xl">
            Encontre uma van para sua próxima aventura.
          </h1>
          <p className="font-light text-sm text-zinc-300">
            Encontre vans confortáveis e prontas para a estrada. Perfeito para
            viagens em família ou uma escapadela com amigos
          </p>
        </div>
        <Card className="max-w-[40%] w-full h-fit bg-white rounded-md p-5">
          <SearchForm
            title="Busque por Aqui"
            subtitle="Preencha os campos abaixo"
            isWide={false}
          />
        </Card>
      </section>
      <Section>
        <Card className="shadow-2xl">
          <div className="w-full h-fit">
            <h3 className="text-lg text-zinc-950 font-semibold">
              Viaje agora mesmo
            </h3>
            <p className="text-sm text-zinc-500">
              Veja aqui todas as vans disponíveis, de acordo com o
              origem/destino
            </p>
          </div>
          <div className="w-full min-h-fit h-full whitespace-nowrap flex flex-row py-4 overflow-auto gap-3 custom-scrollbar">
            {Array.from({ length: 16 }).map((_, index) => (
              <TripCard key={index} />
            ))}
          </div>
        </Card>
      </Section>
    </>
  )
}
