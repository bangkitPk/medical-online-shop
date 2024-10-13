import CartNavBottom from "@/components/cart-page-mobile/CartNavBottom";
import CartProductList from "@/components/cart-page-mobile/CartProductList";
import CartTable from "@/components/cart-table";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { displayMoney } from "@/helpers/displayMoney";
import { useToast } from "@/hooks/use-toast";
import { updateCart } from "@/redux/thunks/cartThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function CartPage() {
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart);
  const [initialProductsCart, setInitialProductsCart] = useState([]);
  const diskon = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    setInitialProductsCart(cart.products);
  }, []);

  function hasCartChanged() {
    // cek apa ada perubahan data jumlah produk pada keranjang
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].jumlah !== initialProductsCart[i]?.jumlah) {
        return true;
      }
    }
    // jika ada produk yang dihapus
    if (cart.products.length !== initialProductsCart.length) {
      return true;
    }

    return false;
  }

  async function handleCheckout() {
    if (cart.totalBiaya === 0) {
      toast({
        variant: "warning",
        title: "Pilih barang dulu sebelum checkout",
        action: <ToastAction altText="OK">Ok</ToastAction>,
      });
      return;
    }

    if (!hasCartChanged()) {
      // Tidak ada perubahan dalam keranjang, tidak menjalankan update
      console.log("Tidak ada perubahan, tidak update keranjang");
      navigate("/keranjang/pembayaran");
      return;
    }

    // jika ada perubahan, lakukan update dulu
    try {
      await dispatch(
        updateCart({
          userId: user.uid,
          cartData: { products: cart.products, totalBiaya: cart.totalBiaya },
        })
      ).unwrap(); // unwrap untuk menangkap error jika terjadi
      console.log("Update Keranjang ke Firestore sudah berhasil");
      // alihkan ke halaman pembayaran setelah update berhasil
      navigate("/keranjang/pembayaran");
    } catch (error) {
      console.error("Gagal memperbarui produk:", error);
    }
  }
  return (
    <div className="pb-24 pt-5 px-10 max-sm:px-0 max-sm:min-h-screen max-sm:pb-0">
      <h1 className="max-sm:text-xl max-sm:text-center text-3xl font-black">
        Keranjang Belanja
      </h1>
      <p className="mb-10 max-sm:text-center">
        <b>{cart.products.length} produk</b> di keranjang Anda
      </p>
      <div className="max-sm:flex-col flex gap-10 items-start">
        {/* for mobile screen */}
        <CartProductList />
        <CartNavBottom onCheckout={handleCheckout} />

        {/* for big screen */}
        <CartTable />
        <div className="rounded-lg bg-secondary p-3 w-64 max-sm:hidden">
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
            <Button onClick={handleCheckout} variant="outline">
              Checkout
            </Button>
          </div>
        </div>
      </div>
      <Toaster className="z-50" />
    </div>
  );
}

export default CartPage;
