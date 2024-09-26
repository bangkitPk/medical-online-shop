import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import heroImage from "@/assets/images/hero-image.png";
import { addToCart, removeFromCart } from "@/redux/thunks/cartThunk";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { displayMoney } from "@/helpers/displayMoney";
import { useNavigate } from "react-router-dom";
import { setGuestToast } from "@/redux/slices/guestSlice";

export default function ProductCard({
  id,
  namaProduk,
  deskripsi,
  harga,
  stok,
}) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // get current user
  const cart = useSelector((state) => state.cart);
  const [inCart, setInCart] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // cek apakah produk sudah ada di keranjang
    // const checkProductInCart = () => {
    //   // console.log(cart.products);
    //   setInCart(cart.products.some((item) => item.id === id));
    // };
    if (!loading && user && cart.products) {
      setInCart(cart.products.some((product) => product.id === id));
    }
  }, [cart, loading]);

  const handleAddToCart = () => {
    if (!user) {
      dispatch(
        setGuestToast({
          title: "Harap Login Terlebih Dulu",
          variant: "warning",
        })
      );
      navigate("/login");
      return;
    }

    setInCart(true);
    setLoading(true);
    const product = { id, namaProduk, deskripsi, harga, stok };
    dispatch(addToCart({ userId: user.uid, product }))
      .then(() => {
        setLoading(false); // Stop loading once the cart is updated
        toast({
          title: "Produk ditambahkan ke keranjang",
          variant: "success",
        });
      })
      .catch(() => {
        setInCart(false); // Revert if adding fails
        setLoading(false);
      });
    // toast({
    //   title: "Produk ditambahkan ke keranjang",
    //   variant: "success",
    // });
  };

  const handleRemoveFromCart = () => {
    if (!user) {
      return toast({
        title: "Harap Login Terlebih Dulu",
        variant: "success",
      });
    }

    setInCart(false);
    setLoading(true);
    dispatch(removeFromCart({ userId: user.uid, productId: id }))
      .then(() => {
        setLoading(false); // Stop loading once the cart is updated
        toast({
          title: "Produk dihapus dari keranjang",
          variant: "warning",
        });
      })
      .catch(() => {
        setInCart(true); // Revert if removing fails
        setLoading(false);
      });
    // toast({
    //   title: "Produk dihapus dari keranjang",
    //   variant: "warning",
    // });
  };

  return (
    <div className="w-full max-w-52">
      <Toaster />
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <img
          src={heroImage}
          alt="Product Image"
          // width={600}
          // height={400}
          className="w-full object-cover aspect-square"
        />
        <div className="p-2">
          <h3 className="font-semibold truncate">{namaProduk}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Toko Medis Jaya Sehat
          </p>
          <span className="font-bold">{displayMoney(harga)}</span>
          <div className="flex flex-col items-center justify-between gap-2 mt-2">
            <Button className="w-full" variant="secondary">
              Lihat
            </Button>
            {!inCart ? (
              <Button
                className="w-full"
                variant="outline"
                onClick={handleAddToCart}
              >
                Tambah ke Keranjang
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="outline"
                onClick={handleRemoveFromCart}
              >
                Hapus dari Keranjang
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
