# README


## Database Design

- Product
  - id
  - name
  - price
  - stockCount


- Order
  - id
  - productId
  - quantity
  - trackingNumber
  - trackingCompany
  - status
## Assumptions

- Each order is only tied to one product
- Both product and order can have unlimited quantity
- Can only read/create/update product and order, but not able to delete


## Improvements
- Authorization/Authentication (who can edit what)
- Audit log (event sourcing?)
- Order to support multiple product types (Database schema design is ready, but not at the UI and backend level)
- Validate that the order's product's quantity should not exceed the product's stock count (Inventory management system)
- Ability to search within the data table/dropdown
- Pagination
- Frontend/Backend Validation
  - mandatory fields
  - product name cannot be duplicate
  - price must be of currency type
  - quantity must be integer
- performance profiling for frontend (not done)
- load testing (not done)
