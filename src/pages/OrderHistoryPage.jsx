import OrderHistoryMenu from "@/components/order-history-menu";
import OrdersList from "@/components/orders-list";
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from "react-redux";

function OrderHistoryPage() {
  return (
    <div className="flex flex-col items-center pb-5 min-h-screen">
      <Toaster />
      <h1 className="text-primary text-xl max-sm:text-lg font-semibold mb-5">
        Riwayat Pembelian
      </h1>
      <div className="w-9/12 max-sm:w-full flex flex-col items-center gap-5">
        <OrderHistoryMenu />
        <OrdersList />
      </div>
    </div>
  );
}

export default OrderHistoryPage;
