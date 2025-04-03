import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SET_SEARCH_TERM,
    SET_SORT_ORDER,
  } from '../../constants'
  
  const initialState = {
    items: [],
    loading: false,
    error: null,
    limit: 10,
    skip: 0,
    hasMore: true,
    searchTerm: '',
    sortOrder: '',
  }
  
  export const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null }
  
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          loading: false,
          items: action.payload.products,
          skip: state.skip + action.payload.products.length,
          hasMore: action.payload.hasMore,
        }
  
      case FETCH_PRODUCTS_FAILURE:
        return { ...state, loading: false, error: action.payload }
  
      case SET_SEARCH_TERM:
        return { ...state, searchTerm: action.payload, skip: 0, items: [] }
  
      case SET_SORT_ORDER:
        return { ...state, sortOrder: action.payload }
  
      default:
        return state
    }
  }