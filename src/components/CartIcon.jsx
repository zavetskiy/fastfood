import './CartIcon.css'

function CartIcon({ count, onClick }) {
  return (
    <button type="button" className="cart-icon" aria-label="Корзина" onClick={onClick}>
      <svg className="cart-bag" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M3 5h2l2.1 10.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L21 7H7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.5" fill="currentColor" />
        <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      </svg>
      <span className="cart-count">{count}</span>
    </button>
  )
}

export default CartIcon
