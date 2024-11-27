import { z } from 'zod'

export const DeleteUserRequestSchema = z.object({
  idUser: z.string().min(1, 'Id is required')
})

// Inferindo o tipo fiel ao schema
export type DeleteUserRequestDto = z.infer<typeof DeleteUserRequestSchema>
