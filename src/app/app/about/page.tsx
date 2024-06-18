import { Metadata } from 'next'
import Credits from './_components/credits'

export const metadata: Metadata = {
  title: 'Sobre',
}

export default function About() {
  return (
    <>
      <article className="w-full h-fit px-32 pb-0 py-16">
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
      <Credits />
    </>
  )
}
