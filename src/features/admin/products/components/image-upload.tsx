"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Star, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImageFile extends File {
  preview: string
}

interface ImageUploadProps {
  value: ImageFile[]
  onChange: (files: ImageFile[]) => void
  error?: string
  existingImages?: string[]
  onRemoveExisting?: (index: number) => void
}

export function ImageUpload({ value, onChange, error, existingImages, onRemoveExisting }: ImageUploadProps) {
  const [files, setFiles] = useState<ImageFile[]>(value)

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    }
  }, [files])

  const onDrop = useCallback(
    (accepted: File[]) => {
      const newFiles = accepted.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as ImageFile[]
      const updated = [...files, ...newFiles].slice(0, 5)
      setFiles(updated)
      onChange(updated)
    },
    [files, onChange],
  )

  const removeFile = useCallback(
    (index: number) => {
      const file = files[index]
      if (file) URL.revokeObjectURL(file.preview)
      const updated = files.filter((_, i) => i !== index)
      setFiles(updated)
      onChange(updated)
    },
    [files, onChange],
  )

  const setMain = useCallback(
    (index: number) => {
      const updated = [...files]
      const [item] = updated.splice(index, 1)
      updated.unshift(item)
      setFiles(updated)
      onChange(updated)
    },
    [files, onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024,
    disabled: files.length >= 5,
  })

  const totalImages = (existingImages?.length ?? 0) + files.length
  const isMaxed = totalImages >= 5

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          isMaxed && "pointer-events-none opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
        <p className="text-sm font-medium">
          {isDragActive ? "Drop images here" : "Drag & drop images"}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          PNG, JPG or WebP up to 5MB ({totalImages}/5)
        </p>
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {existingImages && existingImages.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {existingImages.map((url, index) => (
            <div key={`existing-${index}`} className="group relative aspect-square">
              <div
                className="h-full w-full rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${url})` }}
              />
              {index === 0 && files.length === 0 && (
                <div className="absolute left-1 top-1 rounded-md bg-primary/80 px-1 py-0.5">
                  <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
                </div>
              )}
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(index)}
                  className="absolute right-1 top-1 rounded-md bg-destructive/80 p-1 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
              <div className="absolute bottom-1 left-1 right-1 truncate rounded-md bg-background/80 px-1 py-0.5 text-[10px] text-muted-foreground text-center">
                Existing
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {files.map((file, index) => (
            <div key={file.name + index} className="group relative aspect-square">
              <img
                src={file.preview}
                alt={file.name}
                className="h-full w-full rounded-lg object-cover"
                onLoad={() => URL.revokeObjectURL(file.preview)}
              />
              {(existingImages?.length ?? 0) === 0 && index === 0 && (
                <div className="absolute left-1 top-1 rounded-md bg-primary/80 px-1 py-0.5">
                  <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
                </div>
              )}
              {(existingImages?.length ?? 0) > 0 && index === 0 && (
                <button
                  type="button"
                  onClick={() => {}}
                  className="absolute left-1 top-1 rounded-md bg-background/80 p-1 opacity-0"
                  disabled
                >
                  <Star className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
              {index > 0 && (existingImages?.length ?? 0) === 0 && (
                <button
                  type="button"
                  onClick={() => setMain(index)}
                  className="absolute left-1 top-1 hidden rounded-md bg-background/80 p-1 transition-opacity hover:bg-background group-hover:block"
                  title="Set as main image"
                >
                  <Star className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-1 top-1 rounded-md bg-destructive/80 p-1 text-destructive-foreground opacity-0 transition-opacity hover:bg-destructive group-hover:opacity-100"
                title="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="absolute bottom-1 left-1 right-1 truncate rounded-md bg-background/80 px-1 py-0.5 text-[10px] text-muted-foreground">
                {file.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalImages === 0 && (
        <div className="flex flex-col items-center gap-2 py-4">
          <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground/60">
            No images yet. Drag & drop or click to upload.
          </p>
        </div>
      )}
    </div>
  )
}
