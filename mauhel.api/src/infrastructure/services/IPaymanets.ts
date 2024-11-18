export interface IPayments {
    createPlan: () => Promise<void>
    listPlans: () => Promise<void>

    temp: () => Promise<void>
}