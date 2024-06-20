import { Metadata } from 'next'
import Credits from './_components/credits'
import { FaRoute, FaUsers, FaBolt } from 'react-icons/fa'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Sobre',
}

export default function About() {
  return (
    <>
      <article className="w-full h-fit px-80 py-16 pt-32">
        <h1 className="font-bold text-2xl pb-8">Quem somos?</h1>

        <section className="pb-8">
          <h2 className="font-bold text-xl pb-4">Nossa Missão</h2>
          <p className="pb-4">
            Bem-vindo ao <strong>BUSCAVAN</strong>, a plataforma de busca de
            vans e outros tipos de veículos para viagens em grupo ou turismo.
            Nosso objetivo é conectar motoristas e proprietários de veículos com
            viajantes, garantindo a segurança e a confiabilidade de todas as
            viagens realizadas através da nossa plataforma.
          </p>
          <p>
            No <strong>BUSCAVAN</strong>, qualquer pessoa, seja formal ou
            informal, pode cadastrar seu veículo, fornecendo todas as
            informações necessárias para garantir a segurança e evitar fraudes.
            Por outro lado, os viajantes podem realizar pesquisas detalhadas
            para encontrar a melhor opção de viagem, com a certeza de que todas
            as informações do motorista e do veículo são confiáveis.
          </p>
        </section>

        <section className="pb-8">
          <h2 className="font-bold text-xl pb-4">Plataforma de Conexão</h2>
          <p>
            Somos uma equipe apaixonada por conectar pessoas, dedicando-nos a
            oferecer a melhor experiência para motoristas e viajantes. Nosso
            objetivo é tornar a reserva de viagens um processo rápido e fácil.
          </p>
        </section>

        <section className="pb-8">
          <h2 className="font-bold text-xl pb-4">Nossos Diferenciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center text-center">
              <CardContent className="py-6">
                <FaBolt className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold text-lg mb-2">Agilidade</h3>
                <p>
                  Nossa prioridade é a agilidade. Asseguramos que nossos
                  usuários possam encontrar suas opções de viagem rapidamente e
                  viajar com total tranquilidade e eficiência.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardContent className="py-6">
                <FaRoute className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold text-lg mb-2">Facilidade de Uso</h3>
                <p>
                  Promovemos tanto o negócio daqueles que possuem um veículo e
                  desejam gerar renda, quanto o lazer dos cidadãos que buscam
                  viagens seguras e agradáveis.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardContent className="py-6">
                <FaUsers className="text-4xl mb-4 mx-auto" />
                <h3 className="font-bold text-lg mb-2">Comunidade</h3>
                <p>
                  Junte-se a nós e descubra como é fácil e seguro viajar em
                  grupo com o <strong>BUSCAVAN</strong>! Nossa plataforma é
                  projetada para oferecer a melhor experiência.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>
      <Credits />
    </>
  )
}
