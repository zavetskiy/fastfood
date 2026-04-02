import Modal from './Modal'
import './Filter.css'

const OPTIONS = [
  { key: 'all', label: 'Все товары' },
  { key: 'burger', label: 'Бургеры' },
  { key: 'pizza', label: 'Пицца' },
  { key: 'lavash', label: 'Лаваш' },
]

function Filter({ isOpen, activeFilter, onToggle, onSelect, onApply }) {
  const selectedLabel = OPTIONS.find((option) => option.key === activeFilter)?.label ?? 'Все товары'

  return (
    <div className="filter-row">
      <div className="filter-wrap">
        <button className="filter-btn" type="button" onClick={onToggle}>
          {selectedLabel}
          <span aria-hidden="true" className="filter-caret">
            ▼
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
