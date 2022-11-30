import React from "react";
import { Typography } from "@mui/material";
import { serverRoutes } from "../common/configs";
import { httpPostData, httpGetData } from "../common/utils";

const Landing = () => {
  const fetchAllInvoices = () =>
    httpGetData(serverRoutes.allInvoices).then((resp) =>
      console.log(resp.data)
    );

  const postNewInvoice = () =>
    httpPostData(serverRoutes.newInvoice, {
      invoiceNumber: "0005",
      service: "Im invoicing this, daddy",
      rate: "30",
      quantity: "200",
      totalPrice: "6000",
      issuedAt: 1669716647688,
      payByDate: 1669716647688,
      company: "696969",
      customer: "61200",
    }).then((response) => console.log(response.data));

  return (
    <Typography variant="body">
      Landing.
      <div>
        <button onClick={fetchAllInvoices}>Fetch All Invoices</button>
        <button onClick={postNewInvoice}>Post New Invoice</button>
      </div>
    </Typography>
  );
};

export default Landing;
