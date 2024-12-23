import { LoginCredentials, SignupCredentials } from "../../Form/AuthModel";
import api_client from "../../utils/api_client";

export function signup(user: SignupCredentials, profilePic?: File) {
  const body = new FormData();

  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);

  if (profilePic) {
    body.append("profilePic", profilePic);
  }
  return api_client.post("/user/signup", body);
}

export function login(user: LoginCredentials) {
  // Directly pass the user object since its
  // properties match the expected keys (email and password)
  //  in the backend.
  return api_client.post("/user/login", user);
}
