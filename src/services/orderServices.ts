import api_client from "../utils/api_client";

export function checkOutAPI() {
  return api_client.post("/order/checkout");
}
