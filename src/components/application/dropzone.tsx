import React, { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  onClose: () => void // Add this line
  className?: string
}

export function Dropzone({
  onChange,
  onClose,
  className,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileInfo, setFileInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    handleFiles(files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0]
    const validExtensions = ['png', 'jpg', 'jpeg', 'heic', 'heif', 'webp']
    const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase()

    if (fileExtension && !validExtensions.includes(fileExtension)) {
      setError(
        `Formato de arquivo inválido. Formatos esperados: ${validExtensions.join(', ')}`,
      )
      return
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024)
    const fileUrl = URL.createObjectURL(uploadedFile)
    onChange([fileUrl])
    setFileInfo(`Arquivo enviado: ${uploadedFile.name} (${fileSizeInKB} KB)`)
    setError(null)
    setImageUrl(fileUrl)
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemove = () => {
    setFileInfo(null)
    setImageUrl(null)
    onChange([])
  }

  return (
    <Card
      className={`border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {!imageUrl && (
          <div className="flex items-center justify-center text-muted-foreground">
            <span className="font-medium">
              Arraste o Arquivo para fazer Upload ou
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
              onClick={handleButtonClick}
            >
              Clique aqui
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/heic, image/heif, image/webp"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}
        {fileInfo && <p className="text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
        {imageUrl && (
          <div className="flex justify-center mt-4">
            <Image
              src={imageUrl}
              alt="Uploaded image"
              width={200}
              height={200}
            />
          </div>
        )}
        {imageUrl && (
          <div className="flex justify-center mt-4 space-x-4">
            <>
              <Button onClick={handleRemove} variant="secondary">
                Remover Foto
              </Button>
              <Button onClick={onClose} variant="default">
                Salvar Foto
              </Button>
            </>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
