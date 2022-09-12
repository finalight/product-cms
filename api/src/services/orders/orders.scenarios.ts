import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.OrderCreateArgs>({
  order: {
    one: {
      data: {
        quantity: 9262033,
        trackingNumber: 'String',
        trackingCompany: 'String',
        status: 'PROCESSING',
        updatedAt: '2022-09-12T02:00:40Z',
        product: {
          create: {
            name: 'String',
            price: 3913372.124138208,
            stockCount: 3680372,
            updatedAt: '2022-09-12T02:00:40Z',
          },
        },
      },
    },
    two: {
      data: {
        quantity: 5675099,
        trackingNumber: 'String',
        trackingCompany: 'String',
        status: 'PROCESSING',
        updatedAt: '2022-09-12T02:00:40Z',
        product: {
          create: {
            name: 'String',
            price: 344494.9574025191,
            stockCount: 2431728,
            updatedAt: '2022-09-12T02:00:40Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
