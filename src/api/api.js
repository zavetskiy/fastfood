import axios from 'axios'

const API_URL = 'https://dummyjson.com/products'
const LIMIT = 12

export async function getProducts({ category = '', page = 1 } = {}) {
  try {
    const skip = (page - 1) * LIMIT
    const params = { limit: LIMIT, skip }

    if (category && category !== 'all') {
      params.category = category
    }

    const response = await axios.get(API_URL, { params })
    return {
      products: response.data.products,
      total: response.data.total,
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Не удалось загрузить товары. Попробуйте позже.'
    )
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(`${API_URL}/categories`)
    return response.data
  } catch {
    throw new Error('Не удалось загрузить категории')
  }
}
