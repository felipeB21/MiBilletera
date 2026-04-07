import { getExchangeRate } from "@/hooks/useExchangeRate";
import TotalPrice from "./total-price";

export default async function TotalPriceWrapper() {
  const rate = await getExchangeRate();

  return <TotalPrice rate={rate} />;
}
