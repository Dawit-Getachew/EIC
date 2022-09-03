export interface IBasicID {
  _id: string,
}

export interface IUserSimple {
  _id: string
  user_name: string
  first_name: string
  last_name: string
  email: string
  is_verified: boolean
  groups: string[]
  is_active: string
  attribute: string
  coin_wallet_address: number
  phone_number: string
  updatedAt: Date,
  createdAt: Date,
}