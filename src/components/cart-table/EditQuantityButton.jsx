// import { decreaseQuantity, increaseQuantity } from "@/redux/thunks/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { decreaseQuantity, increaseQuantity } from "@/redux/slices/cartSlice";

export function EditQuantityButton({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);

  const handleAddQuantity = () => {
    dispatch(increaseQuantity({ productId: product.id }));
    console.log(cart.products);
  };

  const handleDecreaseQuantity = () => {
    if (product.jumlah === 1) {
      return;
    }
    dispatch(decreaseQuantity({ productId: product.id }));
  };

  return (
    <div className="flex gap-2 items-center w-full max-sm:w-fit justify-center">
      <Button
        className="aspect-square w-1 h-7 text-primary"
        variant="ghost"
        onClick={handleDecreaseQuantity}
      >
        -
      </Button>
      <span>{product.jumlah}</span>
      <Button
        className="aspect-square w-1 h-7 text-primary"
        variant="ghost"
        onClick={handleAddQuantity}
      >
        +
      </Button>
    </div>
  );
}
