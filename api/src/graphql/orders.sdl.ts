export const schema = gql`
  type Order {
    id: Int!
    productId: Int!
    product: Product!
    quantity: Int!
    trackingNumber: String!
    trackingCompany: String!
    status: OrderStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum OrderStatus {
    PROCESSING
    CANCELLED
    DELIVERED
  }

  type Query {
    orders: [Order!]! @requireAuth
    order(id: Int!): Order @requireAuth
  }

  input CreateOrderInput {
    productId: Int!
    quantity: Int!
    trackingNumber: String!
    trackingCompany: String!
    status: OrderStatus!
  }

  input UpdateOrderInput {
    productId: Int
    quantity: Int
    trackingNumber: String
    trackingCompany: String
    status: OrderStatus
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order! @requireAuth
    updateOrder(id: Int!, input: UpdateOrderInput!): Order! @requireAuth
    deleteOrder(id: Int!): Order! @requireAuth
  }
`
