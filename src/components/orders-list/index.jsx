import { displayMoney } from "@/helpers/displayMoney";
import { useSelector } from "react-redux";

export default function OrdersList() {
  const userOrders = useSelector((state) => state.order);

  return (
    <div className="w-full flex flex-col gap-5">
      {userOrders.filteredOrders?.map((order) => (
        <div key={order.id} className="bg-white shadow-md p-5">
          <div className="flex justify-between items-center">
            <div>
              <p>
                Toko:{" "}
                <span className="text-primary">
                  {order.produk.toko.namaToko}
                </span>
              </p>
              <p className="text-sm">{order.createdAt}</p>
            </div>
            <p className="text-primary">{order.status.toUpperCase()}</p>
          </div>
          <hr className="my-1" />
          <div className="flex items-center justify-between ">
            <div>
              <h3>{order.produk.namaProduk}</h3>
              <span>{order.produk.jumlah}x</span>
            </div>
            <span className="text-primary">
              {displayMoney(order.produk.harga)}
            </span>
          </div>
          <hr className="mt-1 mb-2" />
          <p className="w-full text-right">
            Total Biaya:{" "}
            <span className="text-primary text-lg font-semibold">
              {displayMoney(order.produk.total)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
