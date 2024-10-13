// useFetchToko.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const useFetchToko = () => {
  const [toko, setToko] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToko = async () => {
      try {
        const tokoCollectionRef = collection(db, "Toko");
        const querySnapshot = await getDocs(tokoCollectionRef);

        const tokoList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setToko(tokoList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchToko();
  }, []);

  return { toko, loading, error };
};

export default useFetchToko;
