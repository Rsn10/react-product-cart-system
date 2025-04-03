![image](https://github.com/user-attachments/assets/6532b742-b051-4b24-9263-496b945ee3e3)
![image](https://github.com/user-attachments/assets/a19058c7-7975-43bd-946a-9d82c4c411c7)

## Tech Stack
- React.js (Functional Components & Hooks)
- Redux (State Management)
- Redux Thunk (Middleware for async actions)
- Material UI (UI Components)
- React Router (Navigation)
- Axios (API requests)

## Installation
1. Clone the repository:
   git clone https://github.com/Rsn10/react-product-cart-system.git
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
