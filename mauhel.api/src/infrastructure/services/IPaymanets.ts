export interface IPayments {
    createPlan: () => Promise<void>
    listPlans: () => Promise<void>

    payWithCard: () => Promise<void>
    payWithBolix: () => Promise<void>

    cancelSubscription: (id: number) => Promise<void>

    listSubscriptions: () => Promise<void>

    temp: () => Promise<void>
}