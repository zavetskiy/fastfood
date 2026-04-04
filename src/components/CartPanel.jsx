import './CartPanel.css'

function CartPanel({ items, onClose, onDecrease, onAdd }) {
  const formatPrice = (price) => {
    return `${Math.round(price).toLocaleString('ru-RU')} $`
  }

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  const handleDecrease = (e, item) => {
    e.stopPropagation()
    onDecrease(item.id)
  }

  const handleIncrease = (e, item) => {
    e.stopPropagation()
    onAdd(item)
  }

  return (
    <div className="cart-panel">
      <div className="cart-panel__header">
        <h2>Корзина</h2>
        <button type="button" className="cart-panel__close" onClick={onClose}>
          ×
        </button>
      </div>

      {items.length === 0 ? (
        <p className="cart-panel__empty">Корзина пуста</p>
      ) : (
        <>
          <ul className="cart-panel__list">
            {items.map((item) => (
              <li key={item.id} className="cart-panel__item">
                <div className="cart-panel__info">
                  <span className="cart-panel__title">{item.title}</span>
                  <div className="cart-panel__quantity">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={(e) => handleDecrease(e, item)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={(e) => handleIncrease(e, item)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="cart-panel__sum">{formatPrice(Number(item.price) * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="cart-panel__footer">
            <div className="cart-panel__total-row">
              <span className="cart-panel__label">Итого</span>
              <span className="cart-panel__total">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              className="cart-panel__checkout"
              onClick={() => alert('Оформление заказа...')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPanel
