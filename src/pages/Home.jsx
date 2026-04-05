import { useEffect, useState, useMemo } from 'react'
import { getProducts, getCategories } from '../api/api'
import Filter from '../components/Filter'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import CartPanel from '../components/CartPanel'
import Pagination from '../components/Pagination'
import { useCartStore } from '../store/cartStore'
import './Home.css'

const ITEMS_PER_PAGE = 12

function Home() {
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [pendingCategory, setPendingCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [animatedId, setAnimatedId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const { addToCart, totalCount, items, decreaseItem } = useCartStore()

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (err) {
        console.error('Не удалось загрузить категории:', err)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await getProducts({ page: 1 })
        setAllProducts(data.products)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return allProducts
    return allProducts.filter((item) => item.category === selectedCategory)
  }, [allProducts, selectedCategory])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage])

  const handleBuy = (product) => {
    addToCart(product)
    setAnimatedId(product.id)
    setTimeout(() => setAnimatedId(null), 350)
  }

  const handleSelectFilter = (categoryKey) => {
    setPendingCategory(categoryKey)
    setFilterOpen(false)
  }

  const applyFilter = () => {
    setSelectedCategory(pendingCategory)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page">
      <Header cartCount={totalCount} onToggleCart={() => setCartOpen((prev) => !prev)} />

      <main className="container">
        <div className="hero">
          <h1 className="hero-title">TechStore</h1>
          <p className="hero-subtitle">Электроника, косметика, мебель и лучшие товары для дома</p>
        </div>

        <div className="toolbar">
          <Filter
            isOpen={filterOpen}
            activeFilter={pendingCategory}
            onToggle={() => setFilterOpen((prev) => !prev)}
            onSelect={handleSelectFilter}
            onApply={applyFilter}
            categories={categories}
          />
          <div className="total-box">Найдено: {filteredProducts.length} товаров</div>
        </div>

        {loading && <p className="state-message">Загрузка товаров...</p>}
        {error && !loading && <p className="state-message error">{error}</p>}
        {!loading && !error && (
          <>
            <ProductList products={paginatedProducts} onBuy={handleBuy} animatedId={animatedId} />
            {filteredProducts.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredProducts.length}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {cartOpen && (
          <div className="cart-panel-overlay" onClick={() => setCartOpen(false)}>
            <div className="cart-panel-inner" onClick={(e) => e.stopPropagation()}>
              <CartPanel
                items={items}
                onClose={() => setCartOpen(false)}
                onDecrease={decreaseItem}
                onAdd={addToCart}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
