const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//implement the CORS config
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

//products array
let products = [
    { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
    { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
    { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
    { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
    { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
    { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
];

//function to generate a url for getting a random image from picsum
const fetchImageUrl = () => {
    return `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`;
};

//implement the get api for getting products
app.get('/api/products', (req, res) => {
    try {
        const productsWithImages = products.map(product => ({
            ...product,
            imageUrl: fetchImageUrl()
        }));
        
        res.status(200).json(productsWithImages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

//implement the delete api for deleting a product by Id
app.delete('/api/products/:id', (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const initialLength = products.length;
        
        products = products.filter(product => product.id !== productId);
        
        if (products.length === initialLength) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal error deleting product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});