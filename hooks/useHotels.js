import { useState, useEffect } from "react";

export default function useHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch("/api/hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des hôtels", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return { hotels, loading, setHotels };
}
