'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/hooks/useAuth'
import ErrorLabel from '@/components/application/error-label'
import { useToast } from '@/components/ui/use-toast'
import { CPFInput } from '@/components/application/cpf-input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PhoneNumberInput } from '@/components/application/phone-number-input'

const profileFormSchema = z.object({
  name: z
    .string({ required_error: 'Por favor, informe seu nome' })
    .min(3, 'Mínimo 3 caracteres'),
  email: z
    .string({ required_error: 'Por favor, informe seu e-mail' })
    .email('Por favor, informe um e-mail válido'),
  cpf: z
    .string({ required_error: 'Por favor, informe seu CPF' })
    .min(14, 'CPF inválido'),
  phone: z
    .string({ required_error: 'Por favor, informe seu telefone' })
    .min(14, 'Telefone inválido'),
})

type ProfileFormSchema = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { user, setUser } = useAuth()

  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
    },
  })

  async function onSubmit(data: ProfileFormSchema) {
    try {
      setUser({
        id: user!.id,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
      })

      toast({
        title: 'Perfil atualizado!',
        description: 'Seu perfil foi atualizado com sucesso.',
      })
    } catch (err) {
      toast({
        title: 'Algo deu errado!',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu perfil</CardTitle>
        <CardDescription>Atualize suas informações de perfil</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-[10rem_1fr] gap-3">
            <div className="space-y-0.5 gap-4 flex items-center justify-center flex-col">
              <Avatar className="w-32 h-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button variant={'secondary'} type="button">
                Alterar Imagem
              </Button>
            </div>
            <div>
              <div className="grid grid-cols-[1fr_10rem] gap-3">
                <fieldset className="space-y-0.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    {...register('name')}
                  />
                  {errors.name && (
                    <ErrorLabel>{errors.name?.message}</ErrorLabel>
                  )}
                </fieldset>
                <fieldset className="space-y-0.5">
                  <PhoneNumberInput
                    name="phone"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </fieldset>
              </div>

              <div className="grid grid-cols-[1fr_10rem] gap-3">
                <fieldset className="space-y-0.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    placeholder="Digite seu e-mail"
                    {...register('email')}
                  />
                  {errors.email && (
                    <ErrorLabel>{errors.email?.message}</ErrorLabel>
                  )}
                </fieldset>

                <fieldset className="space-y-0.5">
                  <CPFInput
                    name="cpf"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
