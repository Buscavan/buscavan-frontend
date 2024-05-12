import { AdBanner } from './components/ad-banner'
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
        <div className="max-w-[50%] w-full h-fit bg-white rounded-md p-5">
          <SearchForm />
        </div>
      </section>
      <section className="w-full h-fit px-32 py-12">
        <div className="min-h-24 h-fit rounded-lg shadow-2xl bg-white border border-zinc-200 px-6 py-6">
          <div className="w-full h-fit">
            <h3 className="text-lg text-zinc-950 font-semibold">
              Viaje agora mesmo
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
      <article className="w-full h-fit px-32 pb-12">
        <h1 className="font-bold text-lg pb-4">Quem somos?</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sit nam porttitor consequat
          pulvinar tellus pellentesque. Pulvinar vitae faucibus ut non tincidunt
          tortor nisi. Neque nibh nunc odio sed tellus interdum aliquam sed.
          Fermentum ante urna enim vitae turpis mauris sodales vitae ultrices.
          Nisl ullamcorper et tempus quam sit. Risus cras eu diam vel eget nulla
          eros. Felis malesuada nibh pellentesque est hendrerit augue. Amet
          vestibulum volutpat viverra turpis odio nibh arcu. Tempus urna cursus
          mattis habitasse arcu urna sed etiam amet. Ullamcorper nunc a
          consequat nisl. In a nisi eu faucibus nisl sollicitudin elementum.
          Lacus urna massa neque nec tellus risus pulvinar. Amet congue mauris
          posuere amet elit. Risus mi ut arcu consectetur molestie. Suspendisse
          lacus interdum amet aliquet nulla. Nunc consectetur platea suspendisse
          dui fermentum aliquam mi ultricies quam. Maecenas tincidunt leo sit
          vulputate. Pellentesque molestie faucibus faucibus in porttitor
          lobortis risus. Nunc ipsum ullamcorper egestas sit mauris suscipit
          interdum justo. Tellus arcu tempus penatibus in aliquam. Adipiscing
          cras ornare a eget massa in convallis urna. At risus diam placerat
          enim pretium potenti purus tempor. Urna nunc sit tellus ultrices
          senectus nunc. Praesent in etiam urna netus sollicitudin pulvinar.
          Velit magna et urna quis diam scelerisque. Enim elementum arcu ut
          suspendisse tortor id.
        </p>
      </article>
      <AdBanner />
    </div>
  )
}
