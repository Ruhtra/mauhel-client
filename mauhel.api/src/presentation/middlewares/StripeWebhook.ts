import { payedUseCase } from 'mauhel.api/src/application/useCases/User/Payed'
import { env } from '../env'
import express, { Express, Router } from 'express'

import { Stripe } from 'stripe'
import { unpayedUseCase } from 'mauhel.api/src/application/useCases/User/Unpayed'

// export function StripeWebhook(): Router {
const stripe = new Stripe(env.STRIPE_SECRET_KEY)
const webhookSecret = env.STRIPE_WEBHOOK_SECRET

// Cria um roteador para o Stripe Webhook
const stripeRouter = Router()

console.log('listener webhook to stripe')

stripeRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const signature = req.headers['stripe-signature']

    let data
    let eventType
    let event

    // verify Stripe event is legit
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
    } catch (err) {
      console.error(`Webhook signature verification failed. ${err.message}`)
      return res.status(400).json({ error: err.message })
    }

    data = event.data
    eventType = event.type

    try {
      switch (eventType) {
        case 'checkout.session.completed': {
          // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
          // ✅ Grant access to the product
          //   let user;
          const session = await stripe.checkout.sessions.retrieve(
            data.object.id,
            {
              expand: ['line_items']
            }
          )
          const customerId = session?.customer as string
          const customer = await stripe.customers.retrieve(customerId as string)
          const priceId = session?.line_items?.data[0]?.price.id

          if (data.object.client_reference_id) {
            payedUseCase.execute({
              idUser: data.object.client_reference_id,
              idClientStripe: customerId
            })
          } else {
            console.error('No user found')
            throw new Error('No user found')
          }
          // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
          //   user.priceId = priceId;
          //   user.hasAccess = true;
          //   await user.save();

          // Extra: >>>>> send email to dashboard <<<<
        }

        case 'customer.subscription.deleted': {
          // ❌ Revoke access to the product
          // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
          const subscription = await stripe.subscriptions.retrieve(
            data.object.id
          )

          const idUserStripe = subscription.customer as string

          // ATUALZIAR BUSCA PARA O IDUSUARIO DO STRIPE
          if (idUserStripe) {
            unpayedUseCase.execute({
              idClientStripe: idUserStripe
            })
          } else {
            console.error('No user found')
            throw new Error('No user found')
          }

          //   const user = await User.findOne({
          //     customerId: subscription.customer,
          //   });

          // Revoke access to your product
          //   user.hasAccess = false;
          //   await user.save();

          break
        }

        default:
        // Unhandled event type
      }
    } catch (e) {
      console.error(
        'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
      )
    }

    return res.json({})
  }
)

export { stripeRouter }
