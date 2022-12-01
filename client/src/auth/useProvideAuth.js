import React, { useState } from "react";

import axios from "axios";
import { API_ROUTES } from "../common/configs";
import { saveJwt, removeJwt } from "../common/utils";
import { manageAuth } from "./manageAuth";

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (cb, user) => {
    return manageAuth.signin(() => {
      axios
        .post(API_ROUTES.login, user)
        .then((response) => {
          if (!response.data) return console.error(response);

          saveJwt(response.data);
          setUser(response.data);

          cb();
        })
        .catch((error) => console.error(error));
    });
  };

  const signout = (cb) => {
    return manageAuth.signout(() => {
      setUser(null);
      removeJwt();
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};
