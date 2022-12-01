import React, { useEffect, useState } from "react";

import { pathOr } from "ramda";

import { httpGetData } from "../common/utils";
import { API_ROUTES } from "../common/configs";

import AddNewButton from "../components/AddNewButton";
import BasicTable from "../components/BasicTable";

const MyCompanies = () => {
  const [companyData, setCompanyData] = useState(null);

  const tableHeader = ["ICO", "DIC", "Company name"];
  const tableDataAccessor = [
    {
      key: "ico",
      type: "plain",
      width: "10%",
      isId: true,
    },
    {
      key: "dic",
      type: "plain",
      width: "10%",
    },
    {
      key: "businessName",
      type: "plain",
      width: "20%",
    },
  ];

  useEffect(() => {
    httpGetData(API_ROUTES.allCompanies)
      .then((response) => setCompanyData(pathOr([], ["data"], response)))
      .catch((error) => console.error(error));
  }, []);

  const handleCompanyOpen = (ico) => {};

  const handleCompanyDelete = (ico) => {};

  const handleCompanyAdd = () => {};

  return (
    <>
      <AddNewButton
        text={"Add new company"}
        handleButtonClick={handleCompanyAdd}
      />

      <BasicTable
        data={companyData}
        header={tableHeader}
        dataAccessor={tableDataAccessor}
        handleOpen={handleCompanyOpen}
        handleDelete={handleCompanyDelete}
      />
    </>
  );
};

export default MyCompanies;
