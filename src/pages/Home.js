import { useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Container,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ProductCard from "../components/Product/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSearchTerm,
  setSortOrder,
} from "../store/actions/productActions";
import { Clear, Search } from "@mui/icons-material";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
    hasMore,
    searchTerm,
    sortOrder,
  } = useSelector((state) => state.products);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        dispatch(setSearchTerm(localSearchTerm));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, dispatch, searchTerm]);

  useEffect(() => {
    dispatch(fetchProducts(true));
  }, [dispatch, searchTerm]);

  const handleSearchChange = (e) => setLocalSearchTerm(e.target.value);
  const handleClearSearch = () => {
    setLocalSearchTerm("");
    dispatch(setSearchTerm(""));
  };
  const handleSort = (e) => dispatch(setSortOrder(e.target.value));
  const handleLoadMore = () => dispatch(fetchProducts());

  const sortedProducts = useMemo(() => {
    if (!sortOrder) return products;
    
    return [...products].sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      
      switch (sortOrder) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        default:
          return 0;
      }
    });
  }, [products, sortOrder]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "100%", md: "85%" },
          margin: "0 auto",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Search products"
          value={localSearchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: localSearchTerm && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                  sx={{ color: 'rgba(0, 0, 0, 0.26)' }}
                >
                  <Clear fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiInputBase-root": {
              height: 56,
            },
            transition: 'all 0.3s ease',
          }}
        />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { xs: "100%", md: "auto" },
          }}
        >
          <TextField
            select
            fullWidth
            variant="outlined"
            label="Sort by"
            value={sortOrder}
            onChange={handleSort}
            sx={{ 
              minWidth: 180,
              '& .MuiSelect-select': {
                display: 'flex',
                alignItems: 'center',
              }
            }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
          </TextField>
        </Box>
      </Box>

      {searchTerm && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 2,
          animation: 'fadeIn 0.5s ease',
          '@keyframes fadeIn': {
            '0%': { opacity: 0, transform: 'translateY(-10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          }
        }}>
          <Typography variant="subtitle1" color="text.secondary">
            Showing results for: <strong>{searchTerm}</strong>
            <Button 
              onClick={handleClearSearch}
              size="small" 
              sx={{ 
                ml: 1,
                color: theme => theme.palette.text.secondary,
                textTransform: 'none',
                '&:hover': {
                  color: theme => theme.palette.error.main,
                }
              }}
            >
              Clear search
            </Button>
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {sortedProducts.length === 0 && !loading ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h5" gutterBottom>
            No products found
          </Typography>
          {searchTerm && (
            <Button
              onClick={handleClearSearch}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Clear search and show all products
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            mt={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sortedProducts.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ProductCard
                  product={product}
                  sx={{
                    width: "100%",
                    maxWidth: 345,
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            {loading ? (
              <CircularProgress size={60} />
            ) : hasMore ? (
              <Button
                variant="contained"
                onClick={handleLoadMore}
                size="large"
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                Load More Products
              </Button>
            ) : (
              products.length > 0 && (
                <Typography variant="body1" color="text.secondary">
                  No more products to load
                </Typography>
              )
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;