import cookie from "cookie";
import { setAuthToken, resetAuthToken } from "~/utils/auth";
export const actions = {
  nuxtServerInit({ dispatch }, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || "");
      if (cookies.hasOwnProperty("authorization")) {
        setAuthToken(cookies["authorization"]);
        dispatch("auth/fetch")
          .then((result) => {
            resolve(true);
          })
          .catch((error) => {
            console.log("Provided token is invalid:", error);
            resetAuthToken();
            resolve(false);
          });
      } else {
        resetAuthToken();
        resolve(false);
      }
    });
  },
};
