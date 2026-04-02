import './ProductCard.css'

function ProductCard({ product, onBuy, isAnimated }) {
  const priceInSum = Math.round(Number(product.price) * 13000)
  const formattedPrice = `${priceInSum.toLocaleString('ru-RU')} сум`

  return (
    <article className={`product-card ${isAnimated ? 'added' : ''}`}>
      <div className="product-image-wrapper">
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
        <div className="product-badge">Хит</div>
      </div>
      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-bottom">
          <div className="product-price-wrapper">
            <span className="product-price">{formattedPrice}</span>
          </div>
          <button type="button" className="buy-btn" onClick={() => onBuy(product)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
