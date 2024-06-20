'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import {
  registerFormSchema,
  RegisterFormSchema,
} from '@/schemas/register-form-schema'
import { CPFInput } from '@/components/application/cpf-input'
import ErrorLabel from '@/components/application/error-label'
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

export function RegisterDriverForm() {
  const { register: registerAuth } = useAuth()
  const [ocult, setOcult] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  })

  const handleUploads = async (userCPF: string | undefined) => {
    if (!userCPF) {
      console.log('CPF não foi enviado, fotos não enviadas.')
      return
    }

    const cnhEndpoint = endpoints.uploadCNHImage.replace('{id}', userCPF)
    const faceEndpoint = endpoints.uploadProfileImage.replace('{id}', userCPF)

    if (cnhFiles.length > 0) {
      console.log('upload cnh')
      await uploadImage(cnhFiles[0], cnhEndpoint)
    }

    if (faceFiles.length > 0) {
      console.log('upload face')
      await uploadImage(faceFiles[0], faceEndpoint)
    }
  }

  const onSubmit = async (data: RegisterFormSchema) => {
    data.role = 'DRIVER'
    await registerAuth(data, handleUploads)
  }

  const uploadImage = async (image: string, url: string) => {
    const formData = new FormData()
    const file = await fetch(image)
      .then((res) => res.blob())
      .then((blob) => new File([blob], 'image.jpg', { type: blob.type }))
    formData.append('file', file)

    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log(response)
  }

  const [cnhFiles, setCnhFiles] = useState<string[]>([])
  const [faceFiles, setFaceFiles] = useState<string[]>([])
  const [isCNHModalOpen, setIsCNHModalOpen] = useState(false)
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false)

  const handleCNHModalClose = () => setIsCNHModalOpen(false)
  const handleFaceModalClose = () => setIsFaceModalOpen(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <fieldset className="space-y-0.5">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" placeholder="Digite seu nome" {...register('name')} />
        {errors.name && <ErrorLabel>{errors.name?.message}</ErrorLabel>}
      </fieldset>

      <fieldset className="space-y-0.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          placeholder="nome@exemplo.com"
          {...register('email')}
        />
        {errors.email && <ErrorLabel>{errors.email?.message}</ErrorLabel>}
      </fieldset>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <fieldset className="flex-1">
          <CPFInput
            name="cpf"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
            className="space-y-0.5"
          />
        </fieldset>

        <fieldset className="flex-1 space-y-0.5">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={ocult ? 'text' : 'password'}
              placeholder="Digite sua senha"
              className="pr-10"
              {...register('password')}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute top-0 right-0"
              onClick={() => setOcult(!ocult)}
            >
              {ocult ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </Button>
          </div>
          {errors.password && (
            <ErrorLabel>{errors.password?.message}</ErrorLabel>
          )}
        </fieldset>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0">
        <fieldset className="space-y-0.5 flex flex-col flex-1">
          <Label className="mb-0.5">Foto CNH</Label>
          <Dialog open={isCNHModalOpen} onOpenChange={setIsCNHModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Enviar CNH</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar CNH</DialogTitle>
                <DialogDescription>
                  Por favor, envie uma foto da sua CNH.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="camera">Câmera</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <Dropzone
                    onChange={setCnhFiles}
                    onClose={handleCNHModalClose}
                  />
                </TabsContent>
                <TabsContent value="camera">
                  <WebcamCapture
                    onSave={(image) => setCnhFiles([image])}
                    onRemove={() => setCnhFiles([])}
                    onClose={handleCNHModalClose}
                  />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </fieldset>

        <fieldset className="space-y-0.5 flex flex-col flex-1">
          <Label className="mb-0.5">Foto Rosto</Label>
          <Dialog open={isFaceModalOpen} onOpenChange={setIsFaceModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Enviar Foto</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Foto</DialogTitle>
                <DialogDescription>
                  Por favor, envie uma foto do seu rosto.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="camera">Câmera</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <Dropzone
                    onChange={setFaceFiles}
                    onClose={handleFaceModalClose}
                  />
                </TabsContent>
                <TabsContent value="camera">
                  <WebcamCapture
                    onSave={(image) => setFaceFiles([image])}
                    onRemove={() => setFaceFiles([])}
                    onClose={handleFaceModalClose}
                  />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </fieldset>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
        {isSubmitting ? 'Entrando...' : 'Cadastrar-se como Motorista'}
      </Button>
    </form>
  )
}
