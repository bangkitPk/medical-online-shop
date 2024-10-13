import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../ui/checkbox";
import { setSelectedProducts } from "@/redux/slices/cartSlice";
import { displayMoney } from "@/helpers/displayMoney";
import { Button } from "../ui/button";

export default function CartNavBottom({ onCheckout }) {
  const userCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // select semua produk
  const handleSelectAll = (checked) => {
    dispatch(setSelectedProducts({ allProducts: checked }));
  };

  return (
    <div className="sm:hidden flex justify-between fixed bottom-0 left-0 px-5 py-2 bg-white w-full border-t-2 ">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={
            userCart?.selectedProducts.length === userCart?.products.length
          }
          onCheckedChange={(value) => handleSelectAll(value)}
          aria-label="Select all"
        />
        <span>Semua</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm">Total</p>
          <p className="font-bold">{displayMoney(userCart.totalBiaya)}</p>
        </div>
        <Button onClick={onCheckout} variant="outline">
          Checkout
        </Button>
      </div>
    </div>
  );
}
