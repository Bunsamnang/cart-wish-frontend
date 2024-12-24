import {
  LoginCredentials,
  SignupCredentials,
} from "../../Authentication/AuthModel";
import api_client from "../../utils/api_client";

const tokenName = "token";

export async function signup(user: SignupCredentials, profilePic?: File) {
  const body = new FormData();

  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);

  if (profilePic) {
    body.append("profilePic", profilePic);
  }
  const { data } = await api_client.post("/user/signup", body);

  localStorage.setItem(tokenName, data.token);
  return data;
}

export async function login(user: LoginCredentials) {
  // Directly pass the user object since its
  // properties match the expected keys (email and password)
  //  in the backend.
  const { data } = await api_client.post("/user/login", user);

  localStorage.setItem(tokenName, data.token);
  return data;
}
