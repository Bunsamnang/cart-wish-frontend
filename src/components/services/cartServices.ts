import api_client from "../../utils/api_client";

export function addToCartApi(productId: string, quantity: number) {
  return api_client.post(`/cart/${productId}`, { quantity });
}
