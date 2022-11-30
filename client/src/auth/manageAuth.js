import { isLoggedIn } from "../common/utils";

export const manageAuth = {
  isAuthenticated: false,

  signin(cb) {
    if (isLoggedIn()) manageAuth.isAuthenticated = true;
    cb();
  },

  signout(cb) {
    manageAuth.isAuthenticated = false;
    cb();
  },
};
