import { z } from 'zod'

export const CreateUserRequestSchema = z.object({
  email: z.string().email('Invalid email format'), // Obrigatório
  name: z.string().min(1, 'Name is required'), // Obrigatório
  password: z.string().min(6, 'Password must be at least 6 characters long'), // Obrigatório
  birthDate: z.coerce.date().refine(date => !isNaN(date.getTime()), {
    message: 'Invalid birth date'
  }), // Coerção direta para Date e validação de data
  role: z.enum(['admin', 'teatcher', 'user']), // Obrigatório
  profilePicture: z.string().url('Invalid URL format').optional() // Opcional
})

// Inferindo o tipo fiel ao schema
export type CreateUserRequestDto = z.infer<typeof CreateUserRequestSchema>
