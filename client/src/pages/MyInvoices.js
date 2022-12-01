import React, { useEffect, useState } from "react";

import { pathOr } from "ramda";

import AddNewButton from "../components/AddNewButton";
import BasicTable from "../components/BasicTable";

import { httpGetData } from "../common/utils";
import { serverRoutes } from "../common/configs";

const MyInvoices = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  console.log(invoiceData);

  const tableHeader = [
    "Invoice nr",
    "Company",
    "Client",
    "Price",
    "Invoiced period",
    "Created at",
  ];
  const tableDataAccessor = [
    {
      key: "invoiceNumber",
      type: "plain",
      width: "10%",
      isId: true,
    },
    {
      key: ["company", "businessName"],
      type: "path",
      width: "15%",
    },
    {
      key: ["customer", "businessName"],
      type: "path",
      width: "15%",
    },
    {
      key: "totalPrice",
      type: "plain",
      width: "10%",
      isPrice: true,
    },
    {
      key: "deliveryDate",
      type: "date",
      width: "15%",
    },
    {
      key: "createdAt",
      type: "date",
      width: "15%",
    },
  ];

  useEffect(() => {
    httpGetData(serverRoutes.allInvoices)
      .then((response) => setInvoiceData(pathOr([], ["data"], response)))
      .catch((error) => console.error(error));
  }, []);

  const handleInvoiceDownload = (invoiceNr) => {};

  const handleInvoiceOpen = (invoiceNr) => {};

  const handleInvoiceDelete = (invoiceNr) => {};

  const handleNewInvoiceAdd = () => {};

  return (
    <>
      <AddNewButton
        text={"Add new invoice"}
        handleButtonClick={handleNewInvoiceAdd}
      />

      <BasicTable
        data={invoiceData}
        header={tableHeader}
        dataAccessor={tableDataAccessor}
        handleDownload={handleInvoiceDownload}
        handleOpen={handleInvoiceOpen}
        handleDelete={handleInvoiceDelete}
      />
    </>
  );
};

export default MyInvoices;
