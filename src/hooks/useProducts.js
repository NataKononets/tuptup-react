import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api/products`
    : "https://dummyjson.com/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

      
        const productsData = data.products ?? data;

        if (isMounted) {
          setProducts(productsData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error loading products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}