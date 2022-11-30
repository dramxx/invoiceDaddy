import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Loader from "../components/Loader";

import { httpGetData } from "../common/utils";
import { serverRoutes } from "../common/configs";

const MyInvoices = () => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    httpGetData(serverRoutes.allInvoices)
      .then((response) => setInvoiceData(response.data))
      .catch((error) => console.error(error));
  }, []);

  const renderTableBody = () => {
    return invoiceData.map((row) => (
      <TableRow
        key={row._id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.invoiceNumber}
        </TableCell>
        <TableCell align="left">{row.company.businessName}</TableCell>
        <TableCell align="left">{row.customer.businessName}</TableCell>
        <TableCell align="left">{row.totalPrice}</TableCell>
        <TableCell align="left">
          {new Date(row.issuedAt).toDateString()}
        </TableCell>
        <TableCell align="right" style={{ display: "flex" }}>
          <IconButton
            aria-label="download"
            color="primary"
            id={row.invoiceNumber}
            onClick={(e) => handleInvoiceDownload(e.currentTarget.id)}
          >
            <DownloadIcon disabled />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="primary"
            id={row.invoiceNumber}
            onClick={(e) => handleInvoiceOpen(e.currentTarget.id)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Invoice nr</TableCell>
              <TableCell align="left">Company</TableCell>
              <TableCell align="left">Client</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Issued at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  const handleInvoiceDownload = (invoiceNr) => {};

  const handleInvoiceOpen = (invoiceNr) => {};

  const handleNewInvoiceAdd = () => {};

  return (
    <>
      <Button
        style={{ marginBottom: "25px" }}
        variant="contained"
        onClick={handleNewInvoiceAdd}
        endIcon={<AddCircleIcon />}
      >
        Add new invoice
      </Button>

      {invoiceData ? renderTable() : <Loader />}
    </>
  );
};

export default MyInvoices;
