import { decreaseQuantity, increaseQuantity } from "@/redux/thunks/cartThunk";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";

export function AddQuantityButton({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddQuantity = () => {
    dispatch(increaseQuantity({ userId: user.uid, productId: product.id }));
  };

  const handleDecreaseQuantity = () => {
    if (product.jumlah === 1) {
      return;
    }
    dispatch(decreaseQuantity({ userId: user.uid, productId: product.id }));
  };

  return (
    <div className="flex gap-2 items-center w-full justify-center">
      <Button
        className="aspect-square w-1 h-7"
        variant="ghost"
        onClick={handleDecreaseQuantity}
      >
        -
      </Button>
      <span>{product.jumlah}</span>
      <Button
        className="aspect-square w-1 h-7"
        variant="ghost"
        onClick={handleAddQuantity}
      >
        +
      </Button>
    </div>
  );
}
