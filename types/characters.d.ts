interface IItem<T> {
  total: number
  skip: number
  limit: number
  products: T[]
}

interface IProduct {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  category: string
}
