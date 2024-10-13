// useFetchOrders.js
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const useFetchOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedOrdersCount, setProcessedOrdersCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollectionRef = collection(db, "Order");
        const querySnapshot = await getDocs(orderCollectionRef);

        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersList);

        const count = ordersList.filter(
          (order) => order.status === "diproses"
        ).length;
        setProcessedOrdersCount(count);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error, processedOrdersCount };
};

export default useFetchOrders;
