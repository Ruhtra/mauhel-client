export interface CreateUserRequestDto {
  email: string
  name: string
  birthDate?: Date

  username: string
  googleId: string
  provider: string
  role: string
  profilePicture?: string
}
