import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { removeFromCart, updateCart } from "@/redux/thunks/cartThunk";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { removeProduct } from "@/redux/slices/cartSlice";
import { useEffect, useState } from "react";

export function RemoveProductButton({ product }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [toastId, setToastId] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleRemoveFromCart = () => {
    // Remove the product from the cart
    dispatch(removeProduct({ productId: product.id }));
    dispatch(removeFromCart({ userId: user.uid, productId: product.id }));

    // Show the toast and store the toast ID
    const { id } = toast({
      title: "Produk dihapus dari keranjang",
      variant: "warning",
    });

    setToastId(id);
  };

  useEffect(() => {
    // Clean up the toast when the component unmounts using REMOVE_TOAST
    return () => {
      if (toastId) {
        dispatch({ type: "REMOVE_TOAST", toastId });
        console.log("Toast removed");
      }
    };
  }, [toastId]);

  return (
    <>
      <Button
        className="aspect-square w-1 h-7 text-primary"
        variant="ghost"
        onClick={handleRemoveFromCart}
      >
        X
      </Button>
    </>
  );
}
