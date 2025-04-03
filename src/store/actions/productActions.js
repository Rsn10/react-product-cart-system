import { 
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    SET_SEARCH_TERM,
    SET_SORT_ORDER,
  } from '../../constants'
  import { ProductService } from '../../api/productApi'
  
  export const fetchProductsRequest = () => ({
    type: FETCH_PRODUCTS_REQUEST
  })
  
  export const fetchProductsSuccess = (products, hasMore) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products, hasMore }
  })
  
  export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
  })
  
  export const setSearchTerm = term => ({
    type: SET_SEARCH_TERM,
    payload: term
  })
  
  export const setSortOrder = order => ({
    type: SET_SORT_ORDER,
    payload: order
  })
  
  export const fetchProducts = (reset = false) => {
    return async (dispatch, getState) => {
      const { limit, skip, searchTerm } = getState().products
      dispatch(fetchProductsRequest())
  
      try {
        const data = await ProductService.getProducts({
          limit,
          skip: reset ? 0 : skip,
          searchTerm
        })
  
        dispatch(fetchProductsSuccess(
          reset ? data.products : [...getState().products.items, ...data.products],
          data.products.length === limit
        ))
      } catch (error) {
        dispatch(fetchProductsFailure(error.message))
      }
    }
  }