const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

// Add basic request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Sample ice cream shops data
const iceCreamShops = [
    { id: 1, name: "Sweet Treats", location: "Main Street", rating: 4.8, flavors: ["Chocolate", "Vanilla", "Strawberry"] },
    { id: 2, name: "Frozen Delights", location: "City Mall", rating: 4.5, flavors: ["Mango", "Butterscotch", "Blueberry"] },
    { id: 3, name: "Ice Magic", location: "Downtown", rating: 4.6, flavors: ["Pista", "Caramel", "Coffee"] }
];

// Get all shops
app.get('/shops', (req, res) => {
    res.json(iceCreamShops);
});

// Create a new shop
app.post('/shops', (req, res) => {
    const newShop = {
        id: iceCreamShops.length + 1,
        ...req.body
    };
    iceCreamShops.push(newShop);
    res.status(201).json(newShop);
});

// Get a specific shop by ID
app.get('/shops/:id', (req, res) => {
    const shop = iceCreamShops.find(s => s.id == req.params.id);
    if (shop) {
        res.json(shop);
    } else {
        res.status(404).json({ error: "Shop not found" });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`API running at https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});
