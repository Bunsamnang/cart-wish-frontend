import api_client from "../../utils/api_client";

export function checkOutAPI() {
  return api_client.post("/order/checkout");
}

export function getOrderAPI() {
  return api_client.get("/order");
}
