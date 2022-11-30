const router = require("express").Router();
const Invoice = require("../models/Invoice");
const Company = require("../models/Company");
const Customer = require("../models/Customer");
const verify = require("./auth/authVerify");
const Joi = require("joi");

/**
 * Validation of user inputs
 */
const invoiceSchema = Joi.object({
  invoiceNumber: Joi.string().min(4).max(16).required(),
  service: Joi.string().min(3).max(255).required(),
  rate: Joi.string().min(1).max(16).required(),
  quantity: Joi.string().min(1).max(16).required(),
  totalPrice: Joi.string().min(1).max(16).required(),
  issuedAt: Joi.number().required(),
  payByDate: Joi.number().required(),
  company: Joi.string().max(32).required(),
  customer: Joi.string().max(32).required(),
});

/**
 * Create new Invoice
 */
router.post("/new-invoice", verify, async (req, res) => {
  const invoiceExists = await Invoice.findOne({
    invoiceNumber: req.body.invoiceNumber,
  });

  if (invoiceExists)
    return res.status(400).send(`invoice number already exists`);

  const currentCompany = await Company.findOne({ ico: req.body.company });
  const currentCustomer = await Customer.findOne({ ico: req.body.customer });

  const invoice = new Invoice({
    invoiceNumber: req.body.invoiceNumber,
    service: req.body.service,
    rate: req.body.rate,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    createdAt: Date.now(),
    issuedAt: req.body.issuedAt,
    payByDate: req.body.payByDate,
    company: currentCompany,
    customer: currentCustomer,
  });

  try {
    const { error } = await invoiceSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveInvoice = await invoice.save();
      res.status(200).send(`invoice created, ${saveInvoice}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Get all Invoices
 */
router.get("/all-invoices", verify, async (req, res) => {
  try {
    const result = await Invoice.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
