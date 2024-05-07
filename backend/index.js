
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000;


const products = [
    {
        id: 1,
        name: 'Hair Oil',
        image: 'https://yekacosmetics.in/wp-content/uploads/2022/06/main-1l-hair.jpg',
        description: 'Description of Product 1',
        price: 10.99
    },
    {
        id: 2,
        name: 'Body-Lotion',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS09wstA5Nak_-MsgFVazNAXAWlXohpG2goUdpkQHjXuw&s',
        description: 'Description of Product 2',
        price: 15.99
    },
    {
        id: 3,
        name: 'Soap',
        image: 'https://www.bigbasket.com/media/uploads/p/xxl/40273291_3-dettol-neem-bathing-soap-bar-100-pure-neem-oil-provides-999-germ-protection.jpg',
        description: 'Description of Product 3',
        price: 5
    },
    {
        id: 4,
        name: "Washing Powder",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiaCCxTuV9GLTfskpNOTYxOYgiEl5ZL5ns9WSlzKigTQ&s',
        description: 'Description of Product 4',
        price: 20.99
    },
    {
        id: 5,
        name: 'toothpaste',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbj_YTBkS8AyEJmLgB3mVmwEAsw-18kjUISJksISrAg&s',
        description: 'Description of Product 5',
        price: 12.99
    },
    {
        id: 6,
        name: 'Body-Wash',
        image: 'https://m.media-amazon.com/images/I/61CPQ4ZL4wL._AC_UF1000,1000_QL80_.jpg',
        description: 'Description of Product 6',
        price: 16.99
    },
    // Add more products as needed
];

app.use(cors());
app.use(bodyParser.json());

// Product data API endpoint
app.get('/api/products', (req, res) => {
    res.json(products);
});


app.post('/api/placeOrder', (req, res) => {
    console.log(req.body);
    const { firstName, lastName, address} = req.body;

    // Validation
    if (!firstName || !lastName || !address) {
        return res.status(400).json({ error: "First name, last name, address are required." });
    }

    res.json({ message: "Order placed successfully." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
