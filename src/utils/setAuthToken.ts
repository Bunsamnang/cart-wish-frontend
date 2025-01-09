import api_client from "./api_client";

const setAuthToken = (token: string) => {
  if (token) {
    api_client.defaults.headers.common["x-auth-token"] = token;
  } else {
    console.log("No auth token");
    delete api_client.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
