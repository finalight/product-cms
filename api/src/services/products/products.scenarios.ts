import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: 'String',
        price: 2782227.668523327,
        stockCount: 5448420,
        updatedAt: '2022-09-11T14:54:13Z',
      },
    },
    two: {
      data: {
        name: 'String',
        price: 1860245.51343976,
        stockCount: 8131652,
        updatedAt: '2022-09-11T14:54:13Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
