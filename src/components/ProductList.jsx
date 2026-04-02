import ProductCard from './ProductCard'
import './ProductList.css'

function ProductList({ products, onBuy, animatedId }) {
  if (!products.length) {
    return <p className="empty">Товары по выбранной категории не найдены.</p>
  }

  return (
    <section id="catalog" className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuy={onBuy}
          isAnimated={animatedId === product.id}
        />
      ))}
    </section>
  )
}

export default ProductList
