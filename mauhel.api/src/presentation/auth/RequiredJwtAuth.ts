import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { RoleType } from 'mauhel.api/src/domain/types/RoleType'

export const requireJwtAuth = passport.authenticate('jwt', { session: false })

export const requireJwtAuthWithRole = (role: RoleType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    requireJwtAuth(req, res, () => {
      if (req.user && req.user.role === role) {
        next()
      } else {
        res.status(403).json({ message: 'Access denied' })
      }
    })
  }
}
