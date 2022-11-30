const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    min: 4,
    max: 16,
  },
  service: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  rate: {
    type: String,
    required: true,
    min: 1,
    max: 16,
  },
  quantity: {
    type: String,
    required: true,
    min: 1,
    max: 16,
  },
  totalPrice: {
    type: String,
    required: true,
    min: 1,
    max: 16,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  issuedAt: {
    type: Number,
    required: true,
  },
  payByDate: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
