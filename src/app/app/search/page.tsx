import { Metadata } from 'next'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { SearchForm } from './_components/search-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { VehicleCard } from './_components/vehicle-card'

export const metadata: Metadata = {
  title: 'Viagens',
}

export default function Search() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>
          Pesquise sua viagem!
        </ApplicationPageHeaderTitle>
      </ApplicationPageHeader>

      <ApplicationPageContent>
        <SearchForm />

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
            <CardDescription>
              Veículos disponíveis para sua viagem.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <VehicleCard
                key={i}
                vehicleName="Mercedes Sprinter"
                description="Teste"
                price={1000}
                date="16/10/2024"
              />
            ))}
          </CardContent>
        </Card>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
