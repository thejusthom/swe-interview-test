import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onDelete }) => {
  return (
    <Card sx={{ position: 'relative' }}>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => onDelete(product.id)}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 2
          }}
        >
          <DeleteIcon sx={{ color: '#ff1744' }} />
        </IconButton>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" sx={{fontWeight: 900}}>
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1}}>
          ${product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
