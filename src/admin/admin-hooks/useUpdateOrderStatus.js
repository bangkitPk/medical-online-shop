import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useState } from "react";

function useUpdateOrderStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    setError(null);
    try {
      const orderRef = doc(db, "Order", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { updateOrderStatus, loading, error };
}

export default useUpdateOrderStatus;
