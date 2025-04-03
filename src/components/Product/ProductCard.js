import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  Tooltip,
  Badge,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../../store/actions/cartActions";
import { useState } from "react";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const availableStock = product.stock - (cartItem?.quantity || 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => dispatch(addToCart(product, 1));
  
  const handleIncrease = () => {
    if (availableStock > 0) {
      dispatch(updateQuantity(product.id, cartItem.quantity + 1));
    }
  };
  
  const handleDecrease = () => {
    if (cartItem.quantity > 1) {
      dispatch(updateQuantity(product.id, cartItem.quantity - 1));
    } else {
      // Remove from cart if quantity would become 0
      dispatch(removeFromCart(product.id));
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  // Calculate discount if price and discountPercentage are available
  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minWidth: { xs: "100%", sm: 300, md: 300 },
          maxWidth: 300,
          height: 480,
          flexGrow: 1,
          position: "relative",
          boxShadow: isHovered ? theme.shadows[6] : theme.shadows[2],
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[10],
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Favorite button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            color: isFavorite ? theme.palette.error.main : "rgba(0,0,0,0.5)",
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.9)",
            },
          }}
          onClick={toggleFavorite}
        >
          {isFavorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        {/* Discount badge */}
        {hasDiscount && (
          <Chip
            icon={<LocalOfferIcon fontSize="small" />}
            label={`${product.discountPercentage}% OFF`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 2,
              fontWeight: "bold",
            }}
          />
        )}

        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            objectFit: "contain",
            p: 1,
            transition: "transform 0.3s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Rating
              value={product.rating}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>

          <Chip
            label={product.category}
            size="small"
            sx={{ mb: 1.5, textTransform: "capitalize" }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            {hasDiscount && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${originalPrice}
              </Typography>
            )}
            <Typography
              variant="h6"
              color={hasDiscount ? "error" : "primary"}
              sx={{ fontWeight: 700 }}
            >
              ${product.price}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1.5,
              gap: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Stock:
            </Typography>
            <Badge
              color={
                availableStock > 5
                  ? "success"
                  : availableStock > 0
                  ? "warning"
                  : "error"
              }
              badgeContent={availableStock}
              sx={{
                "& .MuiBadge-badge": {
                  right: -5,
                  top: 1,
                  border: `1px solid ${theme.palette.background.paper}`,
                  padding: "0 4px",
                },
              }}
            />
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "center", pb: 2 }}>
          {!cartItem ? (
            <Button
              size="small"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              disabled={availableStock <= 0}
              startIcon={<ShoppingCartIcon />}
              sx={{
                fontWeight: 600,
                textTransform: "none",
                py: 1,
                borderRadius: 1,
              }}
            >
              {availableStock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-between",
                gap: 1,
                px: 1,
              }}
            >
              <Tooltip title={cartItem.quantity <= 1 ? "Remove from cart" : "Decrease quantity"}>
                <IconButton
                  aria-label="decrease"
                  onClick={handleDecrease}
                  color="primary"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>

              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {cartItem.quantity}
              </Typography>

              <Tooltip title="Increase quantity">
                <IconButton
                  aria-label="increase"
                  onClick={handleIncrease}
                  disabled={availableStock <= 0}
                  color="primary"
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;