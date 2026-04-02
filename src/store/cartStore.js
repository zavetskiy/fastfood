import { createContext, createElement, useContext, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'nike_cart_items'
const CartContext = createContext(null)

function readInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [] }
    const parsed = JSON.parse(raw)
    return { items: Array.isArray(parsed) ? parsed : [] }
  } catch {
    return { items: [] }
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    }
    case 'DECREASE_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload)
      if (!existing) return state

      if (existing.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        }
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readInitialState)

  const value = useMemo(() => {
    const totalCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

    return {
      items: state.items,
      totalCount,
      addToCart: (product) => dispatch({ type: 'ADD_ITEM', payload: product }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      decreaseItem: (id) => dispatch({ type: 'DECREASE_ITEM', payload: id }),
    }
  }, [state.items])

  return createElement(CartContext.Provider, { value }, children)
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider')
  }
  return context
}

export function persistCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // ignore write errors
  }
}
