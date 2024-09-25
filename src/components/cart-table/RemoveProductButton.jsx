import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { removeFromCart } from "@/redux/thunks/cartThunk";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";

export function RemoveProductButton({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { toast } = useToast();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ userId: user.uid, productId: product.id }));

    toast({
      title: "Produk dihapus dari keranjang",
      variant: "warning",
    });
  };

  return (
    <Button
      className="aspect-square w-1 h-7"
      variant="ghost"
      onClick={handleRemoveFromCart}
    >
      X
      <Toaster />
    </Button>
  );
}
