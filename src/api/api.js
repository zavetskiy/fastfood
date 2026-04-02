const API_URL = 'https://prowebtech.uz/api/v1/products'

export async function getProducts() {
  const allProducts = []
  let nextUrl = API_URL

  while (nextUrl) {
    const response = await fetch(nextUrl)
    if (!response.ok) {
      throw new Error('Не удалось загрузить товары. Попробуйте позже.')
    }

    const data = await response.json()
    allProducts.push(...(Array.isArray(data.results) ? data.results : []))
    nextUrl = data.next ? data.next.replace('http://', 'https://') : null
  }

  return allProducts
}
