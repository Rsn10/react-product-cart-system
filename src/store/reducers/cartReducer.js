import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    CLEAR_CART,
  } from '../../constants'
  
  const initialState = {
    items: []
  }
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        const existingItem = state.items.find(item => item.id === action.payload.id)
        if (existingItem) {
          return {
            ...state,
            items: state.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + action.payload.quantity }
                : item
            )
          }
        }
        return { ...state, items: [...state.items, action.payload] }
  
      case REMOVE_FROM_CART:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        }
  
      case UPDATE_QUANTITY:
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
        }
  
      case CLEAR_CART:
        return { ...state, items: [] }
  
      default:
        return state
    }
  }