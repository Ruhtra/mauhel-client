import { DisciplineEntity } from 'mauhel.api/src/domain/entities/DisciplineEntity'

export interface IDisciplineRepository {
  findByName(disciplineName: string): Promise<DisciplineEntity | null>
}
