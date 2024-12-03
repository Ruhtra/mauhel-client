import { QuestionEntity } from 'mauhel.api/src/domain/entities/QuestionEntity'

export interface IQuestionRepository {
  create(question: QuestionEntity): Promise<QuestionEntity>
  findById(questionId: string): Promise<QuestionEntity | null>
}
