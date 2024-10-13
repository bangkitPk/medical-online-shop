// hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

export default function useFetchProducts(page = 1) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const productsCollectionRef = collection(db, "Produk");
      let productsQuery = query(
        productsCollectionRef,
        orderBy("namaProduk"),
        limit(10)
      );

      if (page > 1 && lastDoc) {
        productsQuery = query(
          productsCollectionRef,
          orderBy("namaProduk"),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const productsSnapshot = await getDocs(productsQuery);
      const fetchedProducts = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(fetchedProducts);
      setLastDoc(productsSnapshot.docs[productsSnapshot.docs.length - 1]);
      setFirstDoc(productsSnapshot.docs[0]);
      setHasMore(productsSnapshot.docs.length === 10);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return { products, loading, error, hasMore };
}
