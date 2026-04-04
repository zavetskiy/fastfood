import './ProductCard.css'

function ProductCard({ product, onBuy, isAnimated }) {
  const imageUrl = Array.isArray(product.images) ? product.images[0] : product.thumbnail
  const formattedPrice = `$${Number(product.price).toFixed(2)}`
  const discount = product.discountPercentage > 0 ? `-${Math.round(product.discountPercentage)}%` : null

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const emptyStars = 5 - fullStars
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">★</span>
        ))}
      </>
    )
  }

  return (
    <article className={`product-card ${isAnimated ? 'added' : ''}`}>
      <div className="product-image-wrapper">
        <img className="product-image" src={imageUrl} alt={product.title} loading="lazy" />
        {discount && <span className="product-discount">{discount}</span>}
      </div>
      <div className="product-body">
        {product.brand && <span className="product-brand">{product.brand}</span>}
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <div className="rating-stars">{renderStars(product.rating)}</div>
          <span className="rating-value">{product.rating}</span>
          <span className="rating-count">({product.stock})</span>
        </div>
        <div className="product-bottom">
          <div className="product-price-wrapper">
            <span className="product-price">{formattedPrice}</span>
          </div>
          <button type="button" className="buy-btn" onClick={() => onBuy(product)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
