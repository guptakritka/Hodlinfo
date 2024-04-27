const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
  name: { type: String },
  last: { type: Number },
  buy: { type: Number },
  sell: { type: Number },
  volume: { type: Number },
  base_unit: { type: mongoose.Schema.Types.Mixed },
  created_at: { type: Date, default: Date.now },
});

const price = mongoose.model('price', valueSchema);

module.exports = price;