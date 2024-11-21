import { IPayment } from '../../infrastructure/services/IPayment'

export class PayamentsStripe implements IPayment {
  payWithSuccess(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  payNotSuccess(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
