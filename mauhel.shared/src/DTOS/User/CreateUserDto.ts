export interface CreateUserRequestDto {
  email: string
  name: string
  password: string
  birthDate?: Date

  username: string
  googleId: string
  provider: string
  role: 'admin' | 'teatcher' | 'user'
  profilePicture?: string
}
