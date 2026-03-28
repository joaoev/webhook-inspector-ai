import { faker } from '@faker-js/faker'
import { db } from '.'
import { webhooks } from './schemas'

const STRIPE_EVENT_TYPES = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'payment_intent.created',
  'charge.succeeded',
  'charge.failed',
  'charge.refunded',
  'invoice.created',
  'invoice.finalized',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'customer.created',
  'customer.updated',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'checkout.session.completed',
] as const

const STRIPE_PATHS = [
  '/capture/stripe',
  '/capture/stripe/payments',
  '/capture/stripe/invoices',
  '/capture/stripe/subscriptions',
] as const

function pick<T>(values: readonly T[]): T {
  return values[faker.number.int({ min: 0, max: values.length - 1 })]
}

function createStripeEventBody() {
  const eventType = pick(STRIPE_EVENT_TYPES)
  const amount = faker.number.int({ min: 500, max: 250000 })
  const currency = faker.helpers.arrayElement(['usd', 'eur', 'brl'])
  const objectType = eventType.startsWith('invoice')
    ? 'invoice'
    : eventType.startsWith('charge')
      ? 'charge'
      : eventType.startsWith('checkout')
        ? 'checkout.session'
        : eventType.startsWith('customer.subscription')
          ? 'subscription'
          : eventType.startsWith('customer')
            ? 'customer'
            : 'payment_intent'

  return {
    id: `evt_${faker.string.alphanumeric({ length: 24, casing: 'lower' })}`,
    object: 'event',
    api_version: '2024-06-20',
    created: faker.date.recent({ days: 60 }).getTime() / 1000,
    livemode: false,
    pending_webhooks: faker.number.int({ min: 0, max: 2 }),
    request: {
      id: `req_${faker.string.alphanumeric({ length: 24, casing: 'lower' })}`,
      idempotency_key: faker.string.uuid(),
    },
    type: eventType,
    data: {
      object: {
        id: `${objectType.split('.')[0]}_${faker.string.alphanumeric({
          length: 24,
          casing: 'lower',
        })}`,
        object: objectType,
        amount,
        amount_due: amount,
        amount_paid: faker.helpers.arrayElement([
          amount,
          faker.number.int({ min: 0, max: amount }),
        ]),
        currency,
        customer: `cus_${faker.string.alphanumeric({
          length: 14,
          casing: 'lower',
        })}`,
        description: faker.commerce.productDescription(),
        status: faker.helpers.arrayElement([
          'succeeded',
          'failed',
          'requires_payment_method',
          'paid',
          'open',
          'canceled',
        ]),
        metadata: {
          order_id: faker.number.int({ min: 1000, max: 99999 }).toString(),
          source: 'seed',
        },
      },
    },
  }
}

function createStripeWebhookRecord() {
  const pathname = pick(STRIPE_PATHS)
  const bodyObject = createStripeEventBody()
  const body = JSON.stringify(bodyObject, null, 2)
  const requestId = `req_${faker.string.alphanumeric({
    length: 24,
    casing: 'lower',
  })}`

  return {
    method: faker.helpers.arrayElement(['POST', 'POST', 'POST', 'PUT']),
    pathname,
    ip: faker.internet.ip(),
    statusCode: faker.helpers.arrayElement([200, 200, 200, 202, 400]),
    contentType: 'application/json',
    contentLength: Buffer.byteLength(body, 'utf8'),
    queryParams: {
      source: 'stripe',
      api_version: '2024-06-20',
      account: `acct_${faker.string.alphanumeric({
        length: 16,
        casing: 'lower',
      })}`,
    },
    headers: {
      host: faker.internet.domainName(),
      'user-agent': 'Stripe/1.0 (+https://stripe.com/docs/webhooks)',
      'content-type': 'application/json',
      'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=${faker.string.hexadecimal(
        {
          length: 64,
          casing: 'lower',
          prefix: '',
        },
      )}`,
      'request-id': requestId,
      accept: '*/*',
    },
    body,
  }
}

async function seed() {
  const records = Array.from({ length: 60 }, createStripeWebhookRecord)
  await db.insert(webhooks).values(records)
  console.log(`Inserted ${records.length} Stripe webhook records`)
}

seed()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
