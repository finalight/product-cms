export const schema = gql`
  type Product {
    id: Int!
    name: String!
    price: Float!
    stockCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    products: [Product!]! @requireAuth
    product(id: Int!): Product @requireAuth
  }

  input CreateProductInput {
    name: String!
    price: Float!
    stockCount: Int!
  }

  input UpdateProductInput {
    name: String
    price: Float
    stockCount: Int
  }

  type Mutation {
    createProduct(input: CreateProductInput!): Product! @requireAuth
    updateProduct(id: Int!, input: UpdateProductInput!): Product! @requireAuth
    deleteProduct(id: Int!): Product! @requireAuth
  }
`
