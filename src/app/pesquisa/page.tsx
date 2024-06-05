import { Metadata } from 'next'
import { SearchForm } from '../components/search-form'
import Section from '../components/section'
import Card from '../components/card'

export const metadata: Metadata = {
  title: 'Pesquisa',
}

export default function Pesquisa() {
  return (
    <>
      <Section>
        <Card>
          <SearchForm
            title="O que você está procurando?"
            subtitle="Veja aqui todas as vans disponíveis, de acordo com o origem/destino"
            isWide={true}
          />
        </Card>
      </Section>
      <Section className="pt-0">
        <Card>
          <div className="w-full h-fit">
            <h3 className="text-lg text-zinc-950 font-semibold">Resultados</h3>
            <p className="text-sm text-zinc-500">Vans disponíveis para você</p>
          </div>
          <div className="w-full min-h-fit h-full whitespace-nowrap flex flex-row pt-4 overflow-auto gap-3"></div>
        </Card>
      </Section>
    </>
  )
}
