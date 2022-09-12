import { orders, order, createOrder, updateOrder, deleteOrder } from './orders'
import type { StandardScenario } from './orders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orders', () => {
  scenario('returns all orders', async (scenario: StandardScenario) => {
    const result = await orders()

    expect(result.length).toEqual(Object.keys(scenario.order).length)
  })

  scenario('returns a single order', async (scenario: StandardScenario) => {
    const result = await order({ id: scenario.order.one.id })

    expect(result).toEqual(scenario.order.one)
  })

  scenario('creates a order', async (scenario: StandardScenario) => {
    const result = await createOrder({
      input: {
        productId: scenario.order.two.productId,
        quantity: 4830881,
        trackingNumber: 'String',
        trackingCompany: 'String',
        status: 'PROCESSING',
        updatedAt: '2022-09-12T02:00:40Z',
      },
    })

    expect(result.productId).toEqual(scenario.order.two.productId)
    expect(result.quantity).toEqual(4830881)
    expect(result.trackingNumber).toEqual('String')
    expect(result.trackingCompany).toEqual('String')
    expect(result.status).toEqual('PROCESSING')
    expect(result.updatedAt).toEqual('2022-09-12T02:00:40Z')
  })

  scenario('updates a order', async (scenario: StandardScenario) => {
    const original = await order({ id: scenario.order.one.id })
    const result = await updateOrder({
      id: original.id,
      input: { quantity: 760142 },
    })

    expect(result.quantity).toEqual(760142)
  })

  scenario('deletes a order', async (scenario: StandardScenario) => {
    const original = await deleteOrder({ id: scenario.order.one.id })
    const result = await order({ id: original.id })

    expect(result).toEqual(null)
  })
})
