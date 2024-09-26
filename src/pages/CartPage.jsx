import CartTable from "@/components/cart-table";
import { Button } from "@/components/ui/button";
import { displayMoney } from "@/helpers/displayMoney";
import { useSelector } from "react-redux";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const diskon = 0;
  return (
    <div className="w-screen py-10 px-10">
      <h1 className="text-3xl font-black">Keranjang Belanja</h1>
      <p className="mb-10">
        <b>{cart.products.length} produk</b> di keranjang Anda
      </p>
      <div className="flex gap-10 items-start">
        <CartTable />
        <div className="rounded-lg bg-secondary p-3 w-64">
          <h2 className="text-lg font-bold mb-5">Total Belanja</h2>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>{displayMoney(cart.totalBiaya)}</p>
          </div>
          <div className="flex justify-between">
            <p>Diskon</p>
            <p>{displayMoney(diskon)}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>{displayMoney(cart.totalBiaya - diskon)}</p>
          </div>
          <div className="flex justify-center mt-10">
            <Button>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
