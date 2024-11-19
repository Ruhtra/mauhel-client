import { IPayments } from "../../infrastructure/services/IPaymanets";

export class PayamentsStripe implements IPayments {
    createPlan: () => Promise<void>;
    listPlans: () => Promise<void>;
    payWithCard: () => Promise<void>;
    payWithBolix: () => Promise<void>;
    cancelSubscription: (id: number) => Promise<void>;
    listSubscriptions: () => Promise<void>;
    temp: () => Promise<void>;

}