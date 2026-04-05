import Modal from './Modal'
import { getCategoryLabel } from '../api/api'
import './Filter.css'

function Filter({ isOpen, activeFilter, onToggle, onSelect, onApply, categories = [] }) {
  const OPTIONS = [
    { key: 'all', label: 'Все товары' },
    ...categories.map((cat) => ({
      key: cat.slug,
      label: getCategoryLabel(cat.slug),
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
          <ul className="filter-list">
            {OPTIONS.map((option) => (
              <li key={option.key}>
                <button
                  className={`filter-option ${activeFilter === option.key ? 'active' : ''}`}
                  type="button"
                  onClick={() => onSelect(option.key)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </Modal>
      </div>

      <button type="button" className="filter-apply" onClick={onApply}>
        Применить
      </button>
    </div>
  )
}

export default Filter
