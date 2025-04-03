import { Box, Typography, IconButton, useTheme, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/actions/cartActions';

const CartItem = ({ item, onIncrease, disableIncrease, availableStock }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, item.quantity - 1));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 2,
      py: 1
    }}>
      <Box sx={{ 
        width: 80, 
        height: 80,
        flexShrink: 0,
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        <img 
          src={item.thumbnail} 
          alt={item.title}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${item.price.toFixed(2)}
        </Typography>
        {availableStock >= 0 && (
          <Typography variant="caption" color={availableStock === 0 ? 'error' : 'text.secondary'}>
            {availableStock === 0 ? 'No more in stock' : `${availableStock} available`}
          </Typography>
        )}
      </Box>
      
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <IconButton
          onClick={handleDecrease}
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        
        <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
          {item.quantity}
        </Typography>
        <Tooltip title={disableIncrease ? "No more available in stock" : "Increase quantity"}>
          <span>
            <IconButton
              onClick={onIncrease}
              disabled={disableIncrease}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        
        
        <IconButton
          onClick={() => dispatch(removeFromCart(item.id))}
          color="error"
          sx={{ ml: 1 }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;