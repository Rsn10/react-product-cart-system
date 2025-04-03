![image](https://github.com/user-attachments/assets/3543af14-a684-416f-b566-e7777c294242)

## Tech Stack
- React.js (Functional Components & Hooks)
- Redux (State Management)
- Redux Thunk (Middleware for async actions)
- Material UI (UI Components)
- React Router (Navigation)
- Axios (API requests)

## Installation
1. Clone the repository:
   git clone https://github.com/your-username/react-product-cart-system.git
   cd react-product-cart-system

2. Install dependencies:
   npm install

3. Create a .env file in the root directory with the following content:
   REACT_APP_API_BASE_URL=https://dummyjson.com
   REACT_APP_API_TIMEOUT=5000

4. Start the development server:
   npm start

5. Open your browser:
   http://localhost:3000

## API Integration
1. **Fetch Products**
      **GET** https://dummyjson.com/products
   
   **Parameters:**
      **limit:** Number of products per request (default: 10)
      **skip:** Pagination offset (e.g., skip=10 gets next 10 products)
   
   **Example:**
      **GET** https://dummyjson.com/products?limit=10&skip=0
      Returns first 10 products

2. **Search Products**
      **GET** https://dummyjson.com/products/search?q={query}
      Searches product titles and descriptions

   **Example:**
      **GET** https://dummyjson.com/products/search?q=phone
      Returns all products matching "phone"
