import { useEffect, useState } from 'react'
import { getProducts, getCategories } from '../api/api'
import Filter from '../components/Filter'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import CartPanel from '../components/CartPanel'
import Pagination from '../components/Pagination'
import { useCartStore } from '../store/cartStore'
import './Home.css'

function Home() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [pendingFilter, setPendingFilter] = useState('all')
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
        const data = await getProducts({ 
          category: activeFilter === 'all' ? '' : activeFilter, 
          page: currentPage 
        })
        setProducts(data.products)
        setTotal(data.total)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [activeFilter, currentPage])

  const handleBuy = (product) => {
    addToCart(product)
    setAnimatedId(product.id)
    setTimeout(() => setAnimatedId(null), 350)
  }

  const handleSelectFilter = (filterKey) => {
    setPendingFilter(filterKey)
    setFilterOpen(false)
  }

  const applyFilter = () => {
    setActiveFilter(pendingFilter)
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
            activeFilter={pendingFilter}
            onToggle={() => setFilterOpen((prev) => !prev)}
            onSelect={handleSelectFilter}
            onApply={applyFilter}
            categories={categories}
          />
          <div className="total-box">Найдено: {total} товаров</div>
        </div>

        {loading && <p className="state-message">Загрузка товаров...</p>}
        {error && !loading && <p className="state-message error">{error}</p>}
        {!loading && !error && (
          <>
            <ProductList products={products} onBuy={handleBuy} animatedId={animatedId} />
            {total > 12 && (
              <Pagination 
                currentPage={currentPage} 
                totalItems={total} 
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
