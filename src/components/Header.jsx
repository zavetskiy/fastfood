import { useState } from 'react'
import CartIcon from './CartIcon'
import './Header.css'

function Header({ cartCount, onToggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" aria-label="TechStore">
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span className="logo-text">TechStore</span>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'nav--open' : ''}`}>
          <a href="#new" onClick={() => setMobileMenuOpen(false)}>Новинки</a>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)}>Каталог</a>
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
