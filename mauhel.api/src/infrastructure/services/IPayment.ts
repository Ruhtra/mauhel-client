export interface IPayment {
  payWithSuccess(): Promise<void>
  payNotSuccess(): Promise<void>
}
