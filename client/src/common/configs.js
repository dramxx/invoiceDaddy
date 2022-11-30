export const routes = {
  home: "/home",
  myInvoices: "/my-invoices",
  myCompanies: "/my-companies",
  myClients: "/my-clients",
  unauthorized: "/unauthorized",
};

export const serverRoutes = {
  login: "http://localhost:3141/api/users/login",
  allInvoices: "http://localhost:3141/api/invoices/all-invoices",
  newInvoice: "http://localhost:3141/api/invoices/new-invoice",
};
