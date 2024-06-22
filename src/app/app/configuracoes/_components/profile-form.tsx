'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FaPencilAlt } from 'react-icons/fa'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dropzone } from '@/components/application/dropzone'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WebcamCapture } from '@/components/application/webcam-capture'
import { api } from '@/api/axios'
import { endpoints } from '@/api/endpoints'
import { getInitials } from '@/utils/get-initials'

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
  phone: z.string(),
})

type ProfileFormSchema = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { user, setUser } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<File | string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      cpf: user?.cpf || '',
      phone: user?.phone || '',
    },
  })

  useEffect(() => {
    const { name, email, cpf } = getValues()
    if ((!name || !email || !cpf) && user && !isEditing) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('cpf', user.cpf)
    }
  }, [getValues, isEditing, setValue, user])

  async function onSubmit(data: ProfileFormSchema) {
    try {
      const response = await api.put(
        `${endpoints.updateUser.replace('{id}', user!.cpf.toString())}`,
        data,
      )

      if (response) {
        setUser({
          ...user!,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          phone: data.phone,
        })
        setIsEditing(false)

        toast({
          title: 'Perfil atualizado!',
          description: 'Seu perfil foi atualizado com sucesso.',
        })
      } else {
        throw new Error('Failed to update profile')
      }
    } catch (err) {
      toast({
        title: 'Algo deu errado!',
        description: 'Verifique os dados e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  async function onSaveProfileImage() {
    if (profileImage) {
      const formData = new FormData()
      if (typeof profileImage === 'string') {
        const response = await fetch(profileImage)
        const blob = await response.blob()
        formData.append(
          'file',
          new File([blob], 'profile.jpg', { type: 'image/jpeg' }),
        )
      } else {
        formData.append('file', profileImage)
      }

      try {
        const response = await api.post(
          `${endpoints.uploadProfileImage.replace('{id}', user!.cpf.toString())}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        if (response) {
          setUser({ ...user!, fotoPerfilUrl: response.data.url })
          setIsDialogOpen(false)
          toast({
            title: 'Imagem de perfil atualizada!',
            description: 'Sua imagem de perfil foi atualizada com sucesso.',
          })
        } else {
          throw new Error('Failed to upload profile image')
        }
      } catch (err) {
        toast({
          title: 'Algo deu errado!',
          description: 'Falha ao enviar a imagem. Tente novamente.',
          variant: 'destructive',
        })
      }
    }
  }

  function resetForm() {
    setValue('name', user?.name || '')
    setValue('email', user?.email || '')
    setValue('cpf', user?.cpf || '')
    setValue('phone', user?.phone || '')
    clearErrors()
    setIsEditing(false)
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
                <AvatarImage src={user?.fotoPerfilUrl} />
                <AvatarFallback>
                  {user?.name ? getInitials(user.name) : 'CARREGANDO'}
                </AvatarFallback>
              </Avatar>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant={'secondary'} type="button">
                    Alterar Imagem
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alterar Imagem</DialogTitle>
                    <DialogDescription>
                      Arraste e solte uma imagem ou clique para selecionar um
                      arquivo.
                    </DialogDescription>
                  </DialogHeader>
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Upload</TabsTrigger>
                      <TabsTrigger value="camera">Câmera</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                      <Dropzone
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(files: any) => {
                          setProfileImage(files[0])
                          onSaveProfileImage()
                        }}
                        onClose={() => {
                          setIsDialogOpen(false)
                          onSaveProfileImage()
                        }}
                      />
                    </TabsContent>
                    <TabsContent value="camera">
                      <WebcamCapture
                        onSave={(image) => {
                          setProfileImage(image)
                          onSaveProfileImage()
                        }}
                        onRemove={() => setProfileImage(null)}
                        onClose={() => {
                          setIsDialogOpen(false)
                          onSaveProfileImage()
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-[1fr_10rem] gap-3">
                <fieldset className="space-y-0.5">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    {...register('name')}
                    disabled={!isEditing}
                  />
                  {errors.name && (
                    <ErrorLabel>{errors.name?.message}</ErrorLabel>
                  )}
                </fieldset>
                <fieldset className="space-y-0.5">
                  <PhoneNumberInput
                    name="phone"
                    register={register}
                    errors={{}}
                    defaultValue={user?.phone}
                    setValue={setValue}
                    getValues={getValues}
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                    defaultValue={user?.cpf}
                    setValue={setValue}
                    getValues={getValues}
                    disabled={!isEditing}
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" type="button" onClick={resetForm}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={() => setIsEditing(true)}
              disabled={isSubmitting}
            >
              <FaPencilAlt className="mr-2" />
              Editar perfil
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
