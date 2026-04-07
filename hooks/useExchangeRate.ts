"use client";

import { useEffect, useState } from "react";

export function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://dolarapi.com/v1/dolares/blue");
        const data = await res.json();

        setRate(data.venta);
      } catch (error) {
        console.error("Error fetching exchange rate", error);
      }
    }

    fetchRate();
  }, []);

  return rate;
}
