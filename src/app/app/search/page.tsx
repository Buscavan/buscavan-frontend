import { Metadata } from 'next'
import {
  ApplicationPage,
  ApplicationPageContent,
  ApplicationPageHeader,
  ApplicationPageHeaderTitle,
} from '@/components/application/page'
import { SearchForm } from './_components/search-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  TravelCard,
  TravelCardContent,
  TravelCardDescription,
  TravelCardHeader,
  TravelCardImage,
  TravelCardInfo,
  TravelCardPrice,
  TravelCardTitle,
} from './_components/travel-card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TravelDetailsModal } from './_components/travel-details-modal'

export const metadata: Metadata = {
  title: 'Explorar',
}

export default function Search() {
  return (
    <ApplicationPage>
      <ApplicationPageHeader>
        <ApplicationPageHeaderTitle>Explorar</ApplicationPageHeaderTitle>
      </ApplicationPageHeader>

      <ApplicationPageContent>
        <SearchForm />

        <Card>
          <CardHeader>
            <CardTitle>Resultados</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <TravelCard>
                    <TravelCardImage />
                    <TravelCardContent>
                      <TravelCardHeader>
                        <TravelCardTitle>Balneário Camboriú</TravelCardTitle>
                        <TravelCardPrice>R$ 1.000,00</TravelCardPrice>
                      </TravelCardHeader>
                      <TravelCardInfo
                        initialDate="Junho 30"
                        endDate="Julho 10"
                        passengers={14}
                      />
                      <TravelCardDescription>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Magnam autem libero optio est et consequatur,
                        totam culpa! Impedit, rem voluptatum.
                      </TravelCardDescription>
                    </TravelCardContent>
                  </TravelCard>
                </DialogTrigger>
                <TravelDetailsModal id={i} />
              </Dialog>
            ))}
          </CardContent>
        </Card>
      </ApplicationPageContent>
    </ApplicationPage>
  )
}
