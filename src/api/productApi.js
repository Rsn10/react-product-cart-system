import apiClient from './apiClient'
import { API_ENDPOINTS } from '../constants'

export const ProductService = {
  getProducts: async ({ limit = 10, skip = 0, searchTerm = '' }) => {
    const endpoint = searchTerm 
      ? API_ENDPOINTS.PRODUCT_SEARCH 
      : API_ENDPOINTS.PRODUCTS

    const params = {
      limit,
      skip,
      ...(searchTerm && { q: searchTerm })
    }

    return apiClient.get(endpoint, { params })
  },
}