export const ADMIN_EMAIL = "gabrielmgb.nd@gmail.com"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface NewsletterData {
  email: string
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  // Simulate API call - In real app, this would send to your email
  console.log("Enviando email para:", ADMIN_EMAIL)
  console.log("Dados do contato:", data)

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real implementation, you would use a service like:
  // - EmailJS
  // - SendGrid
  // - Nodemailer
  // - Resend

  return true
}

export async function subscribeNewsletter(data: NewsletterData): Promise<boolean> {
  console.log("Inscrevendo no newsletter:", data.email)
  console.log("Admin email:", ADMIN_EMAIL)

  await new Promise((resolve) => setTimeout(resolve, 1000))
  return true
}

export function generateEmailTemplate(data: ContactFormData): string {
  return `
    <h2>Nova mensagem do site Dunkstore</h2>
    <p><strong>Nome:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Assunto:</strong> ${data.subject}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${data.message}</p>
    <hr>
    <p><small>Enviado através do formulário de contato do site Dunkstore</small></p>
  `
}
