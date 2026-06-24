export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SELLER = 'seller'
}
//discount Types
export enum DiscountType {
  FIXED_AMOUNT = 'Fixed Amount',
  PERCENTAGE = 'Percentage'
}
//payment Method
export enum PaymentMethod{
  CASH='Cash',
  CARD ='Card'
}
//order status
export enum OrderStatus {
  PENDING = "Pending",
  PLACED = 'Placed',
  ON_WAY = "On_Way",
  CANCELED='Cancel'
}