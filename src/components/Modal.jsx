import './Modal.css'

function Modal({ isOpen, children }) {
  if (!isOpen) return null

  return <div className="filter-modal">{children}</div>
}

export default Modal
