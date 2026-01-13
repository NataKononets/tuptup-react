const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts(useMock = false) {
  const url = useMock
    ? "https://dummyjson.com/products"
    : `${API_URL}/api/products`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return useMock ? data.products : data;
}