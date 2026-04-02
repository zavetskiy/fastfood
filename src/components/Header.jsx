import { useState } from 'react'
import CartIcon from './CartIcon'
import './Header.css'

function Header({ cartCount, onToggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" aria-label="Logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">FastFood</span>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'nav--open' : ''}`}>
          <a href="#new" onClick={() => setMobileMenuOpen(false)}>Новинки</a>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)}>Категории</a>
          <a href="#sale" onClick={() => setMobileMenuOpen(false)}>Скидки</a>
          <a href="#contacts" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>О нас</a>
        </nav>

        <div className="header-actions">
          <CartIcon count={cartCount} onClick={onToggleCart} />
          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
    </header>
  )
}

export default Header
