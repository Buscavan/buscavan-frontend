import { Metadata } from 'next'
import Credits from './_components/credits'

export const metadata: Metadata = {
  title: 'Sobre',
}

export default function About() {
  return (
    <>
      <article className="w-full h-fit px-80 py-16">
        <h1 className="font-bold text-lg pb-4">Quem somos?</h1>
        <p className="pb-4">
          Bem-vindo ao <strong>BUSCAVAN</strong>, a plataforma de busca de vans
          e outros tipos de veículos para viagens em grupo ou turismo. Nosso
          objetivo é conectar motoristas e proprietários de veículos com
          viajantes, garantindo a segurança e a confiabilidade de todas as
          viagens realizadas através da nossa plataforma.
        </p>
        <p className="pb-4">
          No <strong>BUSCAVAN</strong>, qualquer pessoa, seja formal ou
          informal, pode cadastrar seu veículo, fornecendo todas as informações
          necessárias para garantir a segurança e evitar fraudes. Por outro
          lado, os viajantes podem realizar pesquisas detalhadas para encontrar
          a melhor opção de viagem, com a certeza de que todas as informações do
          motorista e do veículo são confiáveis.
        </p>
        <p className="pb-4">
          <strong>Plataforma de Conexão</strong>
          <br />
          Somos uma equipe apaixonada por conectar pessoas, dedicando-nos a
          oferecer a melhor experiência para motoristas e viajantes. Nosso
          objetivo é tornar a reserva de viagens um processo rápido e fácil.
        </p>
        <p>
          Com o <strong>BUSCAVAN</strong>, promovemos tanto o negócio daqueles
          que possuem um veículo e desejam gerar renda, quanto o lazer dos
          cidadãos que buscam viagens seguras e agradáveis. Junte-se a nós e
          descubra como é fácil e seguro viajar em grupo com o{' '}
          <strong>BUSCAVAN</strong>!
        </p>
      </article>
      <Credits />
    </>
  )
}
