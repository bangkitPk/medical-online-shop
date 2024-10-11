import { useEffect, useState } from "react";

export const useFetchRegions = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch provinsi
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch kota
  const fetchCities = async (provinceId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    provinces,
    cities,
    fetchCities,
    loading,
    error,
  };
};
