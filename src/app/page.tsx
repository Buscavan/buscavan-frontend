import { Badge } from '@/components/ui/badge'
import { PopularDestinyCard } from './_components/popular-destiny-card'
import Image from 'next/image'
import { BannerSearchForm } from './_components/banner-search-form'
import { InitialHeader } from './_components/initial-header'
import { AdBanner } from './_components/ad-banner'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <InitialHeader />

      <main className="mt-16 flex flex-col">
        <section className="w-full h-96 bg-banner bg-center bg-cover flex items-center">
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

            <BannerSearchForm />
          </div>
        </section>

        <section className="max-w-7xl w-full mx-auto py-[5rem] flex justify-center items-center gap-8">
          <Image
            src="https://img.freepik.com/fotos-gratis/streaming-de-blogueira-feminina-viaja-online-com-smartphone_23-2148771580.jpg?t=st=1718474143~exp=1718477743~hmac=1acb99be65bd6fd3069d089bae75f400318302e0a5f9640c494dab4cbdb68bd0&w=1380"
            width={1920}
            height={1080}
            alt="Agência"
            className="w-1/2 h-80 rounded-xl object-cover object-center"
          />

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

        <section className="w-full py-[5rem] flex items-center bg-zinc-200 dark:bg-zinc-800">
          <div className="max-w-7xl w-full mx-auto flex flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <Badge>Destinos populares</Badge>
              <h1 className="font-bold text-3xl">
                Explore os melhores destinos
              </h1>
              <p className="text-muted-foreground">
                Descubra os lugares mais incríveis e reserve sua próxima
                aventura conosco.
              </p>
            </div>

            <div className="w-full grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PopularDestinyCard
                  key={i}
                  url="https://img.freepik.com/fotos-gratis/bondinho-do-pao-de-acucar-durante-o-por-do-sol_181624-36743.jpg?t=st=1718473679~exp=1718477279~hmac=906355afde64b5362f26bcc9ae5c685fac53ab205f583a7bbbde85eeb5f9a48c&w=740"
                  cityName="Balneário Camboriú"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <AdBanner />
    </div>
  )
}
