const API = "https://dolarapi.com/v1/dolares/blue";

export async function getExchangeRate() {
  const res = await fetch(API, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error fetching exchange rate");
  }

  const data = await res.json();
  return data.venta;
}
