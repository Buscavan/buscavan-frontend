import { Header } from './components/header'
import { SearchForm } from './components/search-form'
import { TripCard } from './components/trip-card'

export const metadata = {
  title: 'Buscavan - Início',
}

export default function Home() {
  return (
    <div>
      <Header />
      <section className="w-full h-96 bg-banner bg-center bg-cover flex items-center justify-center gap-16 py-16 px-32">
        <div className="w-[50%] h-full flex flex-col items-start justify-center text-white text-left gap-4">
          <h1 className="font-bold text-5xl">
            Encontre uma van para sua próxima aventura.
          </h1>
          <p className="font-light text-sm text-zinc-300">
            Encontre vans confortáveis e prontas para a estrada. Perfeito para
            viagens em família ou uma escapadela com amigos
          </p>
        </div>
        <div className="w-[50%] h-fit bg-white rounded-md p-5">
          <SearchForm />
        </div>
      </section>
      <section className="w-full h-fit px-32 py-12">
        <div className="min-h-24 h-fit rounded-lg shadow-2xl bg-white border border-zinc-200 px-6 py-6">
          <div className="w-full h-fit">
            <h3 className="text-lg text-zinc-950 font-semibold">
              Vans Disponíveis
            </h3>
            <p className="text-sm text-zinc-500">
              Veja aqui todas as vans disponíveis, de acordo com o
              origem/destino
            </p>
          </div>
          <div className="w-full min-h-fit h-full whitespace-nowrap flex flex-row pt-4 overflow-auto gap-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <TripCard key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
