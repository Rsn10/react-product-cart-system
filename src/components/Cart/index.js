import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  IconButton,
  Badge,
  useTheme,
} from '@mui/material';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateQuantity } from '../../store/actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import { motion } from 'framer-motion';
import EmptyCartIllustration from './EmptyCart';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { items } = useSelector(state => state.cart);
  const products = useSelector(state => state.products.items);
  
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getAvailableStock = (item) => {
    const product = products.find(p => p.id === item.id);
    return product ? product.stock - item.quantity : 0;
  };

  const handleIncrease = (item) => {
    const availableStock = getAvailableStock(item);
    if (availableStock > 0) {
      dispatch(updateQuantity(item.id, item.quantity + 1));
    }
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          textAlign: 'center', 
          py: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <EmptyCartIllustration sx={{ width: 200, height: 200, mb: 3 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Looks like you haven't added anything to your cart yet
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              mt: 2,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper sx={{ 
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        position: 'relative'
      }}>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{
            position: 'absolute',
            top: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            borderRadius: 2,
            fontWeight: 600,
            display: { xs: 'none', sm: 'flex' }
          }}
        >
          Continue Shopping
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton 
            onClick={() => navigate('/')} 
            sx={{ 
              mr: 1,
              display: { sm: 'none' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Your Shopping Cart
          </Typography>
          <Badge
            badgeContent={totalItems}
            color="primary"
            sx={{ ml: 2 }}
          >
            <ShoppingCartIcon color="action" />
          </Badge>
        </Box>

        <Stack spacing={2} divider={<Divider sx={{ my: 1 }} />}>
          {items.map(item => {
            const availableStock = getAvailableStock(item);
            return (
              <CartItem 
                key={item.id} 
                item={item} 
                onIncrease={() => handleIncrease(item)}
                disableIncrease={availableStock <= 0}
                availableStock={availableStock}
              />
            );
          })}
        </Stack>

        <Divider sx={{ 
          my: 3,
          borderColor: theme.palette.divider,
          borderBottomWidth: 2
        }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => dispatch(clearCart())}
            startIcon={<DeleteIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              order: { xs: 2, sm: 1 }
            }}
          >
            Clear Cart
          </Button>
          
          <Button
            component={Link}
            to="/"
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              order: { xs: 1, sm: 2 },
              display: { sm: 'none' }
            }}
          >
            Continue Shopping
          </Button>

          <Box sx={{ 
            textAlign: 'right',
            order: { xs: 3, sm: 3 }
          }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Total: ${totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<PaymentIcon />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: '1rem'
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Cart;