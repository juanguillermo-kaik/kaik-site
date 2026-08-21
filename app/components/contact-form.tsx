'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useState } from 'react'

const MAX_FILES = 5
const MAX_FILE_SIZE_MB = 10
const MAX_TOTAL_SIZE_MB = 20

type FormState = {
  type: 'idle' | 'success' | 'error'
  message: string
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function ContactForm() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState<FormState>({ type: 'idle', message: '' })

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files],
  )

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files ?? [])

    if (nextFiles.length > MAX_FILES) {
      setFormState({
        type: 'error',
        message: `Puedes adjuntar hasta ${MAX_FILES} imágenes por envío.`,
      })
      event.target.value = ''
      return
    }

    if (nextFiles.some((file) => !file.type.startsWith('image/'))) {
      setFormState({
        type: 'error',
        message: 'Solo se permiten archivos de imagen.',
      })
      event.target.value = ''
      return
    }

    if (nextFiles.some((file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024)) {
      setFormState({
        type: 'error',
        message: `Cada imagen debe pesar menos de ${MAX_FILE_SIZE_MB} MB.`,
      })
      event.target.value = ''
      return
    }

    const nextTotalSize = nextFiles.reduce((sum, file) => sum + file.size, 0)

    if (nextTotalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      setFormState({
        type: 'error',
        message: `El total de imágenes no puede superar ${MAX_TOTAL_SIZE_MB} MB.`,
      })
      event.target.value = ''
      return
    }

    setFiles(nextFiles)
    setFormState({ type: 'idle', message: '' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormState({ type: 'idle', message: '' })

    const formElement = event.currentTarget
    const formData = new FormData(formElement)

    files.forEach((file) => {
      formData.append('images', file)
    })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        setFormState({
          type: 'error',
          message: payload.message ?? 'No pudimos enviar tu solicitud.',
        })
        return
      }

      formElement.reset()
      setFiles([])
      setFormState({
        type: 'success',
        message: payload.message ?? 'Tu mensaje fue enviado correctamente.',
      })
    } catch {
      setFormState({
        type: 'error',
        message: 'Ocurrió un problema al enviar el formulario. Intenta nuevamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-[2rem] border border-white/90 bg-[rgba(255,255,255,0.82)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-[20px] supports-[backdrop-filter]:bg-white/82"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#262a36]">Nombre</span>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-[1rem] border border-[#d7dcea] bg-white px-4 py-3 text-sm text-[#1f2330] outline-none transition focus:border-[#0037FF] focus:ring-2 focus:ring-[#0037FF]/15"
            placeholder="Tu nombre"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#262a36]">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-[1rem] border border-[#d7dcea] bg-white px-4 py-3 text-sm text-[#1f2330] outline-none transition focus:border-[#0037FF] focus:ring-2 focus:ring-[#0037FF]/15"
            placeholder="tu@empresa.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#262a36]">Empresa</span>
          <input
            type="text"
            name="company"
            className="w-full rounded-[1rem] border border-[#d7dcea] bg-white px-4 py-3 text-sm text-[#1f2330] outline-none transition focus:border-[#0037FF] focus:ring-2 focus:ring-[#0037FF]/15"
            placeholder="Nombre de tu empresa"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#262a36]">Imágenes</span>
          <input
            type="file"
            name="image-picker"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full rounded-[1rem] border border-[#d7dcea] bg-white px-4 py-[0.82rem] text-sm text-[#4f5565] file:mr-3 file:rounded-full file:border-0 file:bg-[#0037FF] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#1b4fff]"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-medium text-[#262a36]">Cuéntanos de tu proyecto</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-[1.2rem] border border-[#d7dcea] bg-white px-4 py-3 text-sm text-[#1f2330] outline-none transition focus:border-[#0037FF] focus:ring-2 focus:ring-[#0037FF]/15"
          placeholder="Describe qué necesitas, referencias o ideas que quieras compartir."
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 text-sm text-[#616775]">
        <p>
          Adjunta hasta {MAX_FILES} imágenes. Máximo {MAX_FILE_SIZE_MB} MB por archivo y {MAX_TOTAL_SIZE_MB} MB en total.
        </p>
        {files.length > 0 ? (
          <div className="rounded-[1.2rem] border border-[#dfe4f0] bg-white/80 p-4">
            <div className="text-sm font-medium text-[#262a36]">Archivos seleccionados</div>
            <ul className="mt-3 space-y-2">
              {files.map((file) => (
                <li key={`${file.name}-${file.size}`} className="flex items-center justify-between gap-4 rounded-[0.9rem] bg-[#f5f8ff] px-3 py-2 text-[#4f5565]">
                  <span className="truncate">{file.name}</span>
                  <span className="shrink-0 text-xs text-[#6e7483]">{formatFileSize(file.size)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-[#6e7483]">Total: {formatFileSize(totalSize)}</div>
          </div>
        ) : null}
        {formState.type !== 'idle' ? (
          <p className={formState.type === 'success' ? 'text-[#0f7b38]' : 'text-[#c0362c]'}>
            {formState.message}
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[#0037FF] px-7 py-3.5 text-sm font-medium text-white shadow-[0_16px_40px_rgba(0,55,255,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b4fff] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar con imágenes'}
        </button>
        <span className="text-sm text-[#6b7080]">También puedes escribirnos a hola@kaik.cl</span>
      </div>
    </form>
  )
}
