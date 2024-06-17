import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function TermsAndPrivacy() {
  return (
    <div className="text-center">
      <p className="text-xs sm:text-sm text-muted-foreground">
        Ao continuar, você concorda com os <TermsOfServiceModal /> e
        <PrivacyPolicyModal />
      </p>
    </div>
  )
}

function TermsOfServiceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-xs sm:text-sm text-zinc-600 underline p-0 h-6"
        >
          Termos de Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Termos de Serviço</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vehicula malesuada lectus, vitae cursus turpis volutpat eget.
            Integer sed sem eu orci tempor dignissim non a velit. Praesent at
            tristique lacus, id efficitur metus. In volutpat posuere ligula, sit
            amet pulvinar ex bibendum at. Integer varius libero a lacus
            volutpat, nec dapibus lorem pulvinar. Maecenas ac orci nisi. Fusce
            auctor felis nec nulla ultricies, at tempor erat cursus. Aenean
            fermentum convallis dui et sodales. Cras fringilla metus eu orci
            elementum, nec tincidunt erat convallis. Curabitur ut eros vitae
            quam malesuada malesuada vel eu nisi. Cras ut vehicula magna.
            Aliquam erat volutpat.
          </p>
          <p>
            Phasellus auctor, metus vitae condimentum suscipit, justo turpis
            blandit libero, a sollicitudin ligula elit a sapien. Curabitur nec
            malesuada risus. Ut euismod orci eu augue cursus, in fermentum metus
            efficitur. Nulla facilisi. Integer at erat ex. In sed bibendum
            lacus. Nulla consectetur ligula non magna fermentum, a tincidunt
            risus bibendum. Etiam et convallis erat. Vivamus a consectetur erat,
            sed volutpat nunc. Sed id quam orci.
          </p>
          <p>
            Suspendisse potenti. Fusce a dapibus nulla, nec tempor ipsum.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Donec ac malesuada mauris. Vivamus at erat ac
            urna efficitur sodales non nec arcu. Nunc efficitur gravida dolor,
            nec convallis ante vehicula in. Sed et lectus eget purus tincidunt
            sodales. Curabitur vel laoreet turpis. Etiam posuere ligula lacus,
            eu posuere quam vestibulum sit amet.
          </p>
          <p>
            Quisque in libero a nunc molestie suscipit nec et lacus. Cras
            tincidunt ex magna, eget fermentum orci efficitur nec. Phasellus at
            dolor sit amet leo convallis viverra. Morbi vehicula purus sed
            turpis tempus, nec varius felis tincidunt. Aenean tincidunt justo ac
            felis scelerisque, eget scelerisque erat egestas. Fusce at fermentum
            purus, in gravida justo. Integer facilisis odio quis magna convallis
            vehicula.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

function PrivacyPolicyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-xs sm:text-sm text-zinc-600 underline p-0 h-6"
        >
          Políticas de Privacidade
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Políticas de Privacidade</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            vehicula malesuada lectus, vitae cursus turpis volutpat eget.
            Integer sed sem eu orci tempor dignissim non a velit. Praesent at
            tristique lacus, id efficitur metus. In volutpat posuere ligula, sit
            amet pulvinar ex bibendum at. Integer varius libero a lacus
            volutpat, nec dapibus lorem pulvinar. Maecenas ac orci nisi. Fusce
            auctor felis nec nulla ultricies, at tempor erat cursus. Aenean
            fermentum convallis dui et sodales. Cras fringilla metus eu orci
            elementum, nec tincidunt erat convallis. Curabitur ut eros vitae
            quam malesuada malesuada vel eu nisi. Cras ut vehicula magna.
            Aliquam erat volutpat.
          </p>
          <p>
            Phasellus auctor, metus vitae condimentum suscipit, justo turpis
            blandit libero, a sollicitudin ligula elit a sapien. Curabitur nec
            malesuada risus. Ut euismod orci eu augue cursus, in fermentum metus
            efficitur. Nulla facilisi. Integer at erat ex. In sed bibendum
            lacus. Nulla consectetur ligula non magna fermentum, a tincidunt
            risus bibendum. Etiam et convallis erat. Vivamus a consectetur erat,
            sed volutpat nunc. Sed id quam orci.
          </p>
          <p>
            Suspendisse potenti. Fusce a dapibus nulla, nec tempor ipsum.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Donec ac malesuada mauris. Vivamus at erat ac
            urna efficitur sodales non nec arcu. Nunc efficitur gravida dolor,
            nec convallis ante vehicula in. Sed et lectus eget purus tincidunt
            sodales. Curabitur vel laoreet turpis. Etiam posuere ligula lacus,
            eu posuere quam vestibulum sit amet.
          </p>
          <p>
            Quisque in libero a nunc molestie suscipit nec et lacus. Cras
            tincidunt ex magna, eget fermentum orci efficitur nec. Phasellus at
            dolor sit amet leo convallis viverra. Morbi vehicula purus sed
            turpis tempus, nec varius felis tincidunt. Aenean tincidunt justo ac
            felis scelerisque, eget scelerisque erat egestas. Fusce at fermentum
            purus, in gravida justo. Integer facilisis odio quis magna convallis
            vehicula.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
