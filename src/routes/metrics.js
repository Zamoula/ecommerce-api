const express = require('express');
const Order = require('../models/order');
const Product = require('../models/product');
const Customer = require('../models/customer');

const router = express.Router();

// Customer Metrics
router.get('/customers/total', async (req, res) => {
    const totalCustomers = await Customer.countDocuments();
    res.json({ totalCustomers });
  });
  
  router.get('/customers/new', async (req, res) => {
    const newCustomers = await Customer.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    res.json({ newCustomers });
  });
  
  router.get('/customers/retention-rate', async (req, res) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const retainedCustomers = await Customer.countDocuments({ lastPurchaseDate: { $gte: oneYearAgo } });
    const totalCustomers = await Customer.countDocuments();
    const retentionRate = totalCustomers ? (retainedCustomers / totalCustomers) * 100 : 0;
    res.json({ retentionRate });
  });
  
  router.get('/customers/churn-rate', async (req, res) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const churnedCustomers = await Customer.countDocuments({ lastPurchaseDate: { $lt: oneYearAgo } });
    const totalCustomers = await Customer.countDocuments();
    const churnRate = totalCustomers ? (churnedCustomers / totalCustomers) * 100 : 0;
    res.json({ churnRate });
  });
  
  router.get('/customers/lifetime-value', async (req, res) => {
    const orders = await Order.aggregate([
      { $group: { _id: '$customer', totalSpent: { $sum: '$totalValue' } } },
      { $group: { _id: null, avgSpent: { $avg: '$totalSpent' } } }
    ]);
    const lifetimeValue = orders.length ? orders[0].avgSpent : 0;
    res.json({ lifetimeValue });
  });
  
  router.get('/customers/acquisition-cost', async (req, res) => {
    // Assuming a fixed total acquisition cost for simplicity
    const totalAcquisitionCost = 10000; // Change this value as needed
    const totalCustomers = await Customer.countDocuments();
    const acquisitionCost = totalCustomers ? totalAcquisitionCost / totalCustomers : 0;
    res.json({ acquisitionCost });
  });
  
  // Product Metrics
  router.get('/products/total', async (req, res) => {
    const totalProducts = await Product.countDocuments();
    res.json({ totalProducts });
  });
  
  router.get('/products/best-selling', async (req, res) => {
    const bestSellingProducts = await Product.find().sort({ sales: -1 }).limit(5);
    res.json(bestSellingProducts);
  });
  
  router.get('/products/inventory-turnover', async (req, res) => {
    const totalSales = await Product.aggregate([
      { $group: { _id: null, totalSales: { $sum: '$sales' } } }
    ]);
    const totalStock = await Product.aggregate([
      { $group: { _id: null, totalStock: { $sum: '$stock' } } }
    ]);
    const inventoryTurnover = totalStock.length ? totalSales[0].totalSales / totalStock[0].totalStock : 0;
    res.json({ inventoryTurnover });
  });
  
  router.get('/products/return-rate', async (req, res) => {
    // Assuming we have a separate collection for returns
    const returns = 50; // Replace with actual logic to get return count
    const totalSales = await Order.countDocuments();
    const returnRate = totalSales ? (returns / totalSales) * 100 : 0;
    res.json({ returnRate });
  });
  
  router.get('/products/average-rating', async (req, res) => {
    const products = await Product.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const averageRating = products.length ? products[0].avgRating : 0;
    res.json({ averageRating });
  });
  
  router.get('/products/stock-levels', async (req, res) => {
    const products = await Product.find({}, 'name stock');
    res.json(products);
  });
  
  // Order Metrics
  router.get('/orders/total', async (req, res) => {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  });
  
  router.get('/orders/average-value', async (req, res) => {
    const orders = await Order.aggregate([
      { $group: { _id: null, avgValue: { $avg: '$totalValue' } } }
    ]);
    const averageOrderValue = orders.length ? orders[0].avgValue : 0;
    res.json({ averageOrderValue });
  });
  
  router.get('/orders/fulfillment-time', async (req, res) => {
    const orders = await Order.aggregate([
      { $group: { _id: null, avgFulfillmentTime: { $avg: '$fulfillmentTime' } } }
    ]);
    const averageFulfillmentTime = orders.length ? orders[0].avgFulfillmentTime : 0;
    res.json({ averageFulfillmentTime });
  });
  
  router.get('/orders/return-rate', async (req, res) => {
    // Assuming we have a separate collection for returns
    const returns = 50; // Replace with actual logic to get return count
    const totalOrders = await Order.countDocuments();
    const returnRate = totalOrders ? (returns / totalOrders) * 100 : 0;
    res.json({ returnRate });
  });
  
  router.get('/orders/revenue', async (req, res) => {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalValue' } } }
    ]);
    const totalRevenue = revenue.length ? revenue[0].totalRevenue : 0;
    res.json({ totalRevenue });
  });
  
  router.get('/orders/frequency', async (req, res) => {
    const customers = await Customer.countDocuments();
    const totalOrders = await Order.countDocuments();
    const orderFrequency = customers ? totalOrders / customers : 0;
    res.json({ orderFrequency });
  });

  module.exports = router;
