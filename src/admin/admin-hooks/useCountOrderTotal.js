// admin-hooks/useFetchCompletedOrders.js
import { useEffect, useState } from "react";
import { db } from "@/config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function useCountOrderTotal() {
  const [totalPenjualan, setTotalPenjualan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const countOrderTotal = async () => {
      setLoading(true);
      try {
        const orderCollectionRef = collection(db, "Order");
        const completedOrdersQuery = query(
          orderCollectionRef,
          where("status", "==", "selesai")
        );
        const querySnapshot = await getDocs(completedOrdersQuery);

        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Hitung total penjualan
        const total = orders.reduce(
          (sum, order) => sum + (order.produk.total || 0),
          0
        );

        setTotalPenjualan(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    countOrderTotal();
  }, []);

  return { totalPenjualan, loading, error };
}
