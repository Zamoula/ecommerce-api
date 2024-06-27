const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./src/routes/products');
const customerRoutes = require('./src/routes/customers');
const orderRoutes = require('./src/routes/orders');
const metricsRoutes = require('./src/routes/metrics');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose.connect('mongodb+srv://jamelmrad000:cntrFgl0SJdJ9fOs@cluster0.s88rsdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Use the routes
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/metrics', metricsRoutes);

app.listen(PORT, () => {
    console.log('Server is running');
});
