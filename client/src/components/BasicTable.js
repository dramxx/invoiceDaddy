import React from "react";
import { pathOr } from "ramda";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Loader from "../components/Loader";

const BasicTable = ({
  data = [],
  header,
  dataAccessor,
  handleDownload,
  handleOpen,
  handleDelete,
}) => {
  const getIdKey = () => {
    return dataAccessor.filter((item) => item.isId)[0].key;
  };

  const handleSpecialCases = (item) => {
    if (item.isPrice) return " €";

    return "";
  };

  const handleDate = (row, item) => {
    switch (item.key) {
      case "deliveryDate":
        return `${new Date(pathOr(null, [item.key], row)).toLocaleString(
          "default",
          { month: "long" }
        )}, ${new Date(pathOr(null, [item.key], row)).getFullYear()}`;

      case "createdAt":
        return new Date(pathOr(null, [item.key], row)).toDateString();

      default:
        return new Date(pathOr(null, [item.key], row)).toDateString();
    }
    Da;
  };

  const handleDataAccess = (row, item) => {
    switch (item.type) {
      case "plain":
        return pathOr("n/a", [item.key], row);
      case "path":
        return pathOr("n/a", [...item.key], row);
      case "date":
        return handleDate(row, item);
    }
  };

  const renderActionButtons = (row) => {
    return (
      <TableCell
        align="right"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {handleDownload && (
          <IconButton
            aria-label="download"
            color="primary"
            id={row[getIdKey(row)]}
            onClick={(e) => handleDownload(e.currentTarget.id)}
          >
            <DownloadIcon disabled />
          </IconButton>
        )}

        {handleOpen && (
          <IconButton
            aria-label="edit"
            color="primary"
            id={row[getIdKey(row)]}
            onClick={(e) => handleOpen(e.currentTarget.id)}
          >
            <EditIcon />
          </IconButton>
        )}

        {handleDelete && (
          <IconButton
            aria-label="delete"
            color="primary"
            id={row[getIdKey(row)]}
            onClick={(e) => handleDelete(e.currentTarget.id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </TableCell>
    );
  };

  const renderTableBody = () => {
    return data.map((row) => (
      <TableRow
        key={pathOr("", ["_id"], row)}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {dataAccessor.map((item, i) => (
          <TableCell
            key={`table_item_${i}`}
            component="th"
            scope="row"
            width={item.width}
          >
            {`${handleDataAccess(row, item)}${handleSpecialCases(item)}`}
          </TableCell>
        ))}

        {renderActionButtons(row)}
      </TableRow>
    ));
  };

  const renderTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="basic table">
          <TableHead>
            <TableRow>
              {header.map((item, i) => (
                <TableCell key={`header_item_${i}`} align="left">
                  {item}
                </TableCell>
              ))}
              <TableCell align="right" style={{ paddingRight: "20px" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  return data ? renderTable() : <Loader />;
};

export default BasicTable;
