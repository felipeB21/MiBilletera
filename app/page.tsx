import { Background } from "@/components/background";
import { Services } from "@/components/services";
import { SubscriptionList } from "@/components/subscrption-list";
import TotalPriceWrapper from "@/components/total-price-wrapper";

export default function Home() {
  return (
    <Background>
      <div className="grid grid-cols-2 gap-2">
        <TotalPriceWrapper />
        <Services />
        <SubscriptionList />
      </div>
    </Background>
  );
}
