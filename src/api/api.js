import axios from 'axios'

const API_URL = 'https://dummyjson.com/products'

export async function getProducts({ category = '', page = 1, limit = 12 } = {}) {
  try {
    const skip = (page - 1) * limit
    const params = { limit, skip }

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

export async function getAllProducts() {
  try {
    const allProducts = []
    let skip = 0
    const limit = 100
    let hasMore = true

    while (hasMore) {
      const response = await axios.get(API_URL, { params: { limit, skip } })
      const products = response.data.products
      
      if (products && products.length > 0) {
        allProducts.push(...products)
        skip += limit
      }
      
      hasMore = products && products.length === limit
    }

    return allProducts
  } catch {
    throw new Error('Не удалось загрузить товары. Попробуйте позже.')
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
