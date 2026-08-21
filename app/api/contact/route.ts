import { NextResponse } from 'next/server'

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_TOTAL_SIZE = 20 * 1024 * 1024

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY
  const contactToEmail = process.env.CONTACT_TO_EMAIL
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json(
      {
        message:
          'El formulario todavía no está configurado para recibir correos. Faltan variables de entorno del envío.',
      },
      { status: 503 },
    )
  }

  const formData = await request.formData()
  const name = formData.get('name')
  const email = formData.get('email')
  const company = formData.get('company')
  const message = formData.get('message')
  const images = formData.getAll('images').filter((entry): entry is File => entry instanceof File)

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json(
      { message: 'Faltan campos obligatorios del formulario.' },
      { status: 400 },
    )
  }

  if (images.length > MAX_FILES) {
    return NextResponse.json(
      { message: `Solo se permiten hasta ${MAX_FILES} imágenes por envío.` },
      { status: 400 },
    )
  }

  if (images.some((image) => !image.type.startsWith('image/'))) {
    return NextResponse.json(
      { message: 'Solo se permiten archivos de imagen.' },
      { status: 400 },
    )
  }

  if (images.some((image) => image.size > MAX_FILE_SIZE)) {
    return NextResponse.json(
      { message: 'Cada imagen debe pesar menos de 10 MB.' },
      { status: 400 },
    )
  }

  const totalSize = images.reduce((sum, image) => sum + image.size, 0)

  if (totalSize > MAX_TOTAL_SIZE) {
    return NextResponse.json(
      { message: 'El total de adjuntos no puede superar 20 MB.' },
      { status: 400 },
    )
  }

  const attachments = await Promise.all(
    images.map(async (image) => {
      const buffer = Buffer.from(await image.arrayBuffer())

      return {
        filename: image.name,
        content: buffer.toString('base64'),
      }
    }),
  )

  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeCompany = typeof company === 'string' ? escapeHtml(company) : ''
  const safeMessage = escapeHtml(message).replaceAll('\n', '<br />')

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: email,
      subject: `Nuevo contacto KAIK de ${name}`,
      html: `
        <h2>Nuevo mensaje desde kaik.cl</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Empresa:</strong> ${safeCompany || 'No indicada'}</p>
        <p><strong>Mensaje:</strong><br />${safeMessage}</p>
        <p><strong>Adjuntos:</strong> ${attachments.length}</p>
      `,
      attachments,
    }),
  })

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text()

    return NextResponse.json(
      {
        message: `No pudimos enviar el correo de contacto. ${errorText}`,
      },
      { status: 502 },
    )
  }

  return NextResponse.json({
    message: 'Tu mensaje fue enviado. Revisaremos tus imágenes y te responderemos pronto.',
  })
}
