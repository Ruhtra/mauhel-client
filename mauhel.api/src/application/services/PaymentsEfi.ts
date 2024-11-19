import EfiPay from "sdk-typescript-apis-efi";
import { IPayments } from "../../infrastructure/services/IPaymanets";

type configPayment = {
    client_id: string,
    client_secret: string,
    sandbox: boolean
}

export class PaymentsEfi implements IPayments {
    constructor(private config: configPayment) { }

    async cancelSubscription (id: number) {

        let params = {
            id: id,
        }

        const efipay = new EfiPay(this.config)

        // O método cancelSubscription indica os campos que devem ser enviados e que serão retornados
        efipay.cancelSubscription(params)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            })
            .catch((error) => {
                console.log(error)
            })

    }
    async payWithBolix () {

        let params = {
            id: 12765,
        }

        let body = {
            payment: {
                banking_billet: {
                    expire_at: '2024-09-20',
                    customer: {
                        name: 'Gorbadoc Oldbuck',
                        email: 'oldbuck@efipay.com.br',
                        cpf: '94271564656',
                        birth: '1977-01-15',
                        phone_number: '5144916523',
                    },
                },
            },
        }

        const efipay = new EfiPay(this.config)

        // O método defineSubscriptionPayMethod indica os campos que devem ser enviados e que serão retornados
        efipay.defineSubscriptionPayMethod(params, body)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            })
            .catch((error) => {
                console.log(error)
            })

    }
    async listSubscriptions () {        
        let params = {
            begin_date: '2024-01-01',
            end_date: '2024-12-31',
            charge_type: 'subscription',
        }
        
        const efipay = new EfiPay(this.config)
        
        // O método listCharges indica os campos que devem ser enviados e que serão retornados
        efipay.listCharges(params)
            .then((resposta) => {
                console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
            })
            .catch((error) => {
                console.log(error)
            })

    }
    async payWithCard () {

    let params = {
        id: 12765,
    }

    let body = {
        items: [
            {
                name: 'Product One',
                value: 300,
                amount: 1,
            },
        ],
        payment: {
            credit_card: {
                payment_token: '5b2bde2d7da10abb1068869ad59359f8eb9b289f',
                billing_address: {
                    street: 'Street 3',
                    number: 10,
                    neighborhood: 'Bauxita',
                    zipcode: '35400000',
                    city: 'Ouro Preto',
                    state: 'MG',
                },
                customer: {
                    name: 'Gorbadoc Oldbuck',
                    email: 'oldbuck@efipay.com.br',
                    cpf: '94271564656',
                    birth: '1977-01-15',
                    phone_number: '5144916523',
                },
            },
        },
    }

    const efipay = new EfiPay(this.config)

    // O método oneStepSubscription indica os campos que devem ser enviados e que serão retornados
    efipay.oneStepSubscription(params, body)
        .then((resposta) => {
            console.log(resposta) // Aqui você tera acesso a resposta da API e os campos retornados de forma intuitiva
        }).catch((error) => {
            console.log(error)
        })

    }
    async temp() {
        let params = {
            id: 12765,
        }

        let body = {
            items: [
                {
                    name: 'Kawan Arthur subscrição',
                    value: 300,
                    amount: 1,
                },
            ],
            settings: {
                payment_method: 'all',
                expire_at: '2024-11-20',
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