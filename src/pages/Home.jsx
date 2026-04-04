import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/api'
import Filter from '../components/Filter'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import CartPanel from '../components/CartPanel'
import { useCartStore } from '../store/cartStore'
import './Home.css'

function resolveCategory(product) {
  const category = product.category?.toLowerCase() ?? ''
  
  if (category.includes('smartphone')) return 'smartphones'
  if (category.includes('laptop')) return 'laptops'
  if (category.includes('headphone') || category.includes('audio')) return 'audio'
  if (category.includes('skincare')) return 'skincare'
  if (category.includes('fragrance')) return 'fragrances'
  if (category.includes('furniture')) return 'furniture'
  if (category.includes('accessory')) return 'accessories'
  return 'all'
}

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [pendingFilter, setPendingFilter] = useState('all')
  const [animatedId, setAnimatedId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  const { addToCart, totalCount, items, decreaseItem } = useCartStore()

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const list = await getProducts()
        setProducts(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return products
    return products.filter((item) => resolveCategory(item) === activeFilter)
  }, [products, activeFilter])

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
          />
          <div className="total-box">Найдено: {filteredProducts.length} товаров</div>
        </div>

        {loading && <p className="state-message">Загрузка товаров...</p>}
        {error && !loading && <p className="state-message error">{error}</p>}
        {!loading && !error && (
          <ProductList products={filteredProducts} onBuy={handleBuy} animatedId={animatedId} />
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
