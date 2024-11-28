import { Token } from 'backupmonitoring.shared/token'

declare global {
  namespace Express {
    interface User extends Token {}
  }
}
