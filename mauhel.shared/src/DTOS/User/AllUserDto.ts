import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

export interface AllUserResponseDto {
  id: string
  name: string
  email: string
  birthDate: Date
  profilePicture?: string
  role: RoleType
  isSubscribed: boolean
  passwordHash: string

  // uncouple
  idClientStripe?: string

  createdAt: Date
  updatedAt?: Date
}
