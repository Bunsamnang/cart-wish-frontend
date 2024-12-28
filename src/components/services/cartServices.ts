import api_client from "../../utils/api_client";

export function addToCartApi(productId: string, quantity: number) {
  return api_client.post(`/cart/${productId}`, { quantity });
}

export async function getUserCart() {
  const res = await api_client.get("/cart");
  return res;
}

export async function removeItem(productId: string) {
  return api_client.patch(`/cart/remove/${productId}`);
}
