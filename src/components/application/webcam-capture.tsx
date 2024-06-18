import React, { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

interface WebcamCaptureProps {
  onSave: (file: string) => void
  onRemove: () => void
  onClose: () => void // Add this line
  className?: string
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onSave,
  onRemove,
  onClose, // Add this line
  className,
}) => {
  const webcamRef = useRef<Webcam>(null)
  const [image, setImage] = useState<string | null>(null)
  const [isCaptureMode, setIsCaptureMode] = useState(true)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setImage(imageSrc)
      setIsCaptureMode(false)
    }
  }, [webcamRef, setImage])

  const handleSave = () => {
    if (image) {
      onSave(image)
      onClose() // Close the modal
    }
  }

  const handleRetake = () => {
    setImage(null)
    setIsCaptureMode(true)
  }

  const handleRemove = () => {
    onRemove()
    setImage(null)
    setIsCaptureMode(true)
  }

  return (
    <Card className={`border-2 border-dashed bg-muted ${className}`}>
      <CardContent className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs">
        {isCaptureMode ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full rounded-lg"
          />
        ) : (
          image && (
            <Image src={image} alt="Captured photo" width={400} height={400} />
          )
        )}

        <div className="flex justify-center mt-4 space-x-4">
          {isCaptureMode ? (
            <Button onClick={capture} variant="default">
              Tirar Foto
            </Button>
          ) : (
            <>
              <Button onClick={handleRetake} variant="secondary">
                Tirar Nova Foto
              </Button>
              <Button onClick={handleSave} variant="default">
                Salvar Foto
              </Button>
            </>
          )}
          {image && !isCaptureMode && (
            <Button onClick={handleRemove} variant="destructive">
              Remover Foto
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
