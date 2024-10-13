import { displayMoney } from "@/helpers/displayMoney";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { updateOrder } from "@/redux/thunks/orderThunk";

export default function OrdersList() {
  const userOrders = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    dispatch(updateOrder({ orderId, newStatus }));
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {console.log(userOrders)}
      {userOrders.filteredOrders?.map((order) => (
        <div key={order.id} className="bg-white shadow-md p-5">
          <div className="flex justify-between items-center">
            <div>
              <p>
                Toko:{" "}
                <span className="text-primary truncate">
                  {order.produk.toko.namaToko}
                </span>
              </p>
              <p className="text-sm">{order.createdAt}</p>
            </div>
            <p
              className={`${
                order.status === "dibatalkan"
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              {order.status.toUpperCase()}
            </p>
          </div>
          <hr className="my-1" />
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="truncate">{order.produk.namaProduk}</h3>
              <span>{order.produk.jumlah}x</span>
            </div>
            <span className="text-primary">
              {displayMoney(order.produk.harga)}
            </span>
          </div>
          <hr className="mt-1 mb-2" />
          <div className="flex justify-between items-center">
            {order.status === "belum dibayar" || order.status === "diproses" ? (
              <Button
                variant="secondary"
                onClick={() => handleUpdateOrderStatus(order.id, "dibatalkan")}
              >
                Batalkan Pesanan
              </Button>
            ) : order.status === "dikirim" ? (
              <Button
                variant="secondary"
                onClick={() => handleUpdateOrderStatus(order.id, "selesai")}
              >
                Konfirmasi Penerimaan
              </Button>
            ) : null}

            <p className="max-sm:text-right">
              Total Biaya:{" "}
              <span className="text-primary text-lg font-semibold">
                {displayMoney(order.produk.total)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
