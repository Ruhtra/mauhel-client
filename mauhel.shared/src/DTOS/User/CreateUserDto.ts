export interface CreateUserRequestDto {
  email: string
  passwordHash: string
  name: string
  birthDate?: Date
  profilePicture?: string
}
