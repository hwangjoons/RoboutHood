// const mongoose = require('mongoose');
import mongoose from 'mongoose';
const stockSchema = new mongoose.Schema({
  id: Number,
  ticker: String,
  industry: String,
  price: String,
  date: String,
  recommendStock: String,
  recommendTicker: String,
  recommendExplanation: String,
  record: Boolean,
})

const Stock = mongoose.model('Stock', stockSchema);

// module.exports = Stock;
export default Stock;