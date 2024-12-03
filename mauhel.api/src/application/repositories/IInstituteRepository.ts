import { InstituteEntity } from 'mauhel.api/src/domain/entities/InstituteEntity'

export interface IInstituteRepository {
  findByName(instituteName: string): Promise<InstituteEntity | null>
}
