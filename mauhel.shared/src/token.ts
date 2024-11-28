import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

export interface Token {
  id: string
  email: string
  name: string
  role: RoleType
}
