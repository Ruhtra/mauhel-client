import { RoleType } from '../types/RoleType'

export const Permissions = {
  user: {
    create: 'user.create',
    delete: 'user.delete',
    all: 'user.all'
  },
  exam: {
    create: 'exam.create',
    all: 'exam.all'
  }
} as const

// Tipo para extrair permissões válidas, incluindo aninhadas
type ExtractPermissions<T> =
  T extends Record<string, any>
    ? {
        [K in keyof T]: T[K] extends Record<string, any>
          ? ExtractPermissions<T[K]> // Recurse apenas nos valores internos
          : T[K] // Pegue o valor final
      }[keyof T]
    : never

// Tipo final das permissões
export type Permission = ExtractPermissions<typeof Permissions>

export const RolePermissions: Record<RoleType, Permission[]> = {
  admin: ['user.create', 'user.delete', 'user.all', 'exam.create', 'exam.all'],
  teacher: ['user.all'],
  user: ['user.all']
}
