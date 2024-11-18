import EfiPay from "sdk-typescript-apis-efi";
import { IPayments } from "../../infrastructure/services/IPaymanets";

type configPayment = {
    client_id: string,
    client_secret: string,
    sandbox: boolean
}

export class Payments implements IPayments {
    constructor(private config: configPayment) { }
    async temp() {
        let params = {
            id: 12765,
        }

        let body = {
            items: [
                {
                    name: 'Product One',
                    value: 600,
                    amount: 1,
                },
            ],
            settings: {
                payment_method: 'all',
                expire_at: '2024-11-19',
                request_delivery_address: false,
            },
        }

        const efipay = new EfiPay(this.config)

        // O método oneStepSubscriptionLink indica os campos que devem ser enviados e que serão retornados
        efipay.oneStepSubscriptionLink(params, body)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            }).catch((error) => {
                console.log(error)
            })

    }
    async createPlan() {
        let params = {}
        let body = {
            name: 'Plano básico',
            interval: 1,
            repeats: 12,
        }

        const efipay = new EfiPay(this.config)

        // O método createPlan indica os campos que devem ser enviados e que serão retornados
        efipay.createPlan(params, body)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            })
            .catch((error) => {
                console.log(error)
            })


    }
    async listPlans() {
        let params = {}
        const efipay = new EfiPay(this.config)

        // O método listPlans indica os campos que devem ser enviados e que serão retornados
        efipay.listPlans(params)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            })
            .catch((error) => {
                console.log(error)
            })

    };
}