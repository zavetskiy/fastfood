import { useEffect, useMemo, useState } from 'react'
import { getProducts } from '../api/api'
import Filter from '../components/Filter'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import CartPanel from '../components/CartPanel'
import { persistCart, useCart } from '../store/cartStore'
import './Home.css'

function resolveCategory(product) {
  const hint = `${product?.title ?? ''} ${product?.description ?? ''}`.toLowerCase()
  if (hint.includes('burger') || hint.includes('бургер')) return 'burger'
  if (hint.includes('pizza') || hint.includes('пицца')) return 'pizza'
  if (hint.includes('lavash') || hint.includes('лаваш') || hint.includes('шаурма')) return 'lavash'
  return 'burger'
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
  const { addToCart, totalCount, items, decreaseItem } = useCart()

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const list = await getProducts()
        setProducts(list)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    persistCart(items)
  }, [items])

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
