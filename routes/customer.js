const router = require("express").Router();
const Customer = require("../models/Customer");
const verify = require("./auth/authVerify");
const Joi = require("joi");

/**
 * Validation of user inputs
 */
const customerSchema = Joi.object({
  businessName: Joi.string().min(3).max(255).required(),
  street: Joi.string().min(3).max(255).required(),
  city: Joi.string().min(3).max(255).required(),
  zip: Joi.string().min(3).max(255).required(),
  state: Joi.string().min(3).max(255).required(),
  ico: Joi.string().max(32).required(),
  dic: Joi.string().max(32),
  icdph: Joi.string().max(32),
  additionalDetails: Joi.string().max(1024),
});

/**
 * Register new customer
 *
 * Checks, if customer already exists
 * Validates user input and saves new customer
 */
router.post("/new-customer", verify, async (req, res) => {
  const customerExists = await Customer.findOne({ ico: req.body.ico });
  if (customerExists) return res.status(400).send(`customer already exists`);

  const currentUser = req.user._id;

  const customer = new Customer({
    businessName: req.body.businessName,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
    ico: req.body.ico,
    dic: req.body.dic,
    icdph: req.body.icdph,
    additionalDetails: req.body.additionalDetails,
    createdAt: Date.now(),
    // user: currentUser,
  });

  try {
    const { error } = await customerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveCustomer = await customer.save();
      res.status(200).send(`customer created, ${saveCustomer}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Get all customers for current user
 */
router.get("/all-customers", verify, async (req, res) => {
  const currentUser = req.user._id;

  try {
    const allCustomers = await Customer.find({ user: currentUser });
    res.status(200).send(allCustomers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
