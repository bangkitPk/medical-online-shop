import { setSelectedProducts } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { EditQuantityButton } from "../cart-table/EditQuantityButton";
import { RemoveProductButton } from "../cart-table/RemoveProductButton";
import { displayMoney } from "@/helpers/displayMoney";
import { Checkbox } from "../ui/checkbox";

// list produk untuk mobile
export default function CartProductList() {
  const userCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // select semua baris
  const handleSelectAll = (checked) => {
    dispatch(setSelectedProducts({ allProducts: checked }));
  };

  return (
    <div className="sm:hidden w-full bg-white flex flex-col gap-5">
      {userCart.products.length > 0
        ? userCart.products.map((item) => (
            <div key={item.id} className="shadow-md p-3 flex gap-5">
              <Checkbox
                checked={userCart?.selectedProducts.some(
                  (p) => p.id === item.id
                )}
                onCheckedChange={() =>
                  dispatch(setSelectedProducts({ product: item }))
                }
                aria-label={`Select ${item.namaProduk}`}
              />
              <div className="flex gap-5 flex-col w-full">
                <div className="flex justify-between">
                  <div className="w-[240px]">
                    <p className="truncate">{item.namaProduk}</p>
                    <p className="text-sm">{displayMoney(item.harga)}</p>
                  </div>
                  <RemoveProductButton product={item} />
                </div>
                <div className="flex justify-between w-full">
                  <p>
                    Total: <b>{displayMoney(item.total)}</b>
                  </p>
                  <EditQuantityButton product={item} />
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
