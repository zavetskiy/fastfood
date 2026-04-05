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

export const CATEGORY_LABELS = {
  smartphones: 'Смартфоны',
  laptops: 'Ноутбуки',
  fragrances: 'Духи',
  skincare: 'Уход за кожей',
  groceries: 'Продукты',
  'home-decoration': 'Декор для дома',
  furniture: 'Мебель',
  tops: 'Одежда',
  automobiles: 'Автомобили',
  automotive: 'Автотовары',
  motorcycle: 'Мотоциклы',
  vehicle: 'Транспорт',
  sunglasses: 'Солнцезащитные очки',
  'womens-jewellery': 'Украшения',
  'womens-shoes': 'Женская обувь',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'womens-watches': 'Женские часы',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'mens-sneakers': 'Кроссовки',
  'sports-accessories': 'Спортивные аксессуары',
  beauty: 'Красота',
}

export function getCategoryLabel(slug) {
  return CATEGORY_LABELS[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
}
