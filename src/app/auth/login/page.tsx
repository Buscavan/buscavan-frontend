import { Button } from '@/components/ui/button'
import { LoginForm } from './_components/login-form'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { RegisterOptionModal } from '@/app/_components/register-option-modal'

export const metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <section className="p-6 flex justify-center items-center">
      <div className="sm:max-w-sm w-full flex flex-col items-center space-y-6 sm:space-y-8">
        <div className="space-y-1 sm:space-y-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Faça Login na Buscavan
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Preencha os dados abaixo para entrar no sistema
          </p>
        </div>

        <LoginForm />

        <div className="w-full flex items-center space-x-3">
          <Separator className="flex-1" />

          <p className="text-xs text-muted-foreground">OU</p>

          <Separator className="flex-1" />
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full hover:cursor-pointer"
              asChild
            >
              <p>Cadastre-se em nossa plataforma</p>
            </Button>
          </DialogTrigger>
          <RegisterOptionModal />
        </Dialog>
      </div>
    </section>
  )
}
