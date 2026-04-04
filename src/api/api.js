import axios from 'axios'

const API_URL = 'https://dummyjson.com/products'
const LIMIT = 12

export async function getProducts() {
  try {
    const response = await axios.get(API_URL, {
      params: { limit: LIMIT },
    })
    return response.data.products
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Не удалось загрузить товары. Попробуйте позже.'
    )
  }
}
