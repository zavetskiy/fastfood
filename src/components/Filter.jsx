import Modal from './Modal'
import './Filter.css'

const CATEGORY_MAP = {
  beauty: 'Косметика',
  fragrances: 'Парфюмерия',
  furniture: 'Мебель',
  groceries: 'Продукты',
  'home-decoration': 'Декор для дома',
  'kitchen-accessories': 'Кухонные аксессуары',
  laptops: 'Ноутбуки',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'mobile-accessories': 'Аксессуары для телефонов',
  motorcycle: 'Мотоциклы',
  'skin-care': 'Уход за кожей',
  smartphones: 'Смартфоны',
  'sports-accessories': 'Спортивные аксессуары',
  sunglasses: 'Солнцезащитные очки',
  tablets: 'Планшеты',
  tops: 'Одежда',
  vehicle: 'Транспорт',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'womens-jewellery': 'Украшения',
  'womens-shoes': 'Женская обувь',
  'womens-watches': 'Женские часы',
}

function translateCategory(slug) {
  return CATEGORY_MAP[slug] || slug
}

function Filter({ isOpen, activeFilter, onToggle, onSelect, onApply, categories = [] }) {
  const OPTIONS = [
    { key: 'all', label: 'Все товары' },
    ...categories.map((cat) => ({
      key: cat.slug,
      label: translateCategory(cat.slug),
    })),
  ]

  const selectedLabel = OPTIONS.find((option) => option.key === activeFilter)?.label ?? 'Все товары'

  return (
    <div className="filter-row">
      <div className="filter-wrap">
        <button className="filter-btn" type="button" onClick={onToggle}>
          {selectedLabel}
          <span aria-hidden="true" className="filter-caret">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </button>

        <Modal isOpen={isOpen}>
          <div className="filter-grid">
            {OPTIONS.map((option) => (
              <button
                key={option.key}
                className={`filter-option ${activeFilter === option.key ? 'active' : ''}`}
                type="button"
                onClick={() => onSelect(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Modal>
      </div>

      <button type="button" className="filter-apply" onClick={onApply}>
        Применить
      </button>
    </div>
  )
}

export default Filter
