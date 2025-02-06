import api_client from "../utils/api_client";

export function getSuggestionsAPI(searchQuery: string) {
  return api_client.get(`/products/suggestions?search=${searchQuery}`);
}
