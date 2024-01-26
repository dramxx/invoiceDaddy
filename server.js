const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth/auth");
const companyRoute = require("./routes/company");
const customerRoute = require("./routes/customer");
const invoiceRoute = require("./routes/invoice");

/**
 * env
 */
dotenv.config();

/**
 * Launch server
 */
const app = express();
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => console.log(`SERVER RUNNING @ ${PORT}`));

/**
 * Connect to the database
 */
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

/**
 * Middleware
 *
 * disabling cors
 * using Json output
 */
app.use(express.json(), cors());

/**
 * Routes
 *
 * authentication ( login, register )
 * admin dashboard ( list all registered users )
 * companies ( create company, list all companies )
 * customers ( create user, list all users )
 * invoices ( create invoice, list all invoices )
 */
app.use("/api/users", authRoute);
app.use("/api/companies", companyRoute);
app.use("/api/customers", customerRoute);
app.use("/api/invoices", invoiceRoute);
