import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container >
     <Typography 
        variant="h2" 
        sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold',
          my: 4
        }}
      >
      Simple Card List
      </Typography>
       <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard 
              product={product} 
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;