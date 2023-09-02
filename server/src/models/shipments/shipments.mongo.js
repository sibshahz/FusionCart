const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending','processed','shipped','delivered','returned'],
    default: 'pending',
    required : true,
  },
  statusDate: {
    type: Date,
    default: Date.now,
  },
});

const shipmentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  shipmentStatus: [statusSchema],  
}, {
  timestamps: true,
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;
