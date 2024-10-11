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
import CartDialog from "../cart-dialog";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({
  id,
  namaProduk,
  deskripsi,
  harga,
  stok,
  idToko,
  kategori,
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
    } else {
      setInCart(false);
    }
  }, [cart, loading]);

  const handleAddToCart = (productQuantity) => {
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
    setLoading(true);
    const product = { id, namaProduk, deskripsi, harga, stok, idToko };
    dispatch(
      addToCart({ userId: user.uid, product, quantity: productQuantity })
    )
      .then(() => {
        setInCart(true);
        setLoading(false);
        toast({
          title: "Produk ditambahkan ke keranjang",
          variant: "success",
        });
      })
      .catch(() => {
        setInCart(false);
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
        setLoading(false);
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
    <div className="w-full max-w-52 cursor-pointer group">
      <Toaster />
      <div
        className={`${
          inCart && "border-black"
        } border overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950 relative`}
      >
        <div className="bg-muted w-full group-hover:scale-y-90 origin-top transition-all ease-in-out duration-300 ">
          <img
            src={heroImage}
            alt="Product Image"
            // width={600}
            // height={400}
            className="w-full object-cover aspect-square group-hover:scale-90 origin-top transition-all ease-in-out duration-300"
          />
        </div>
        {inCart && (
          <ShoppingCart
            size={16}
            className="absolute top-2 right-2 text-success"
          />
        )}
        <div className="p-2 translate-y-1/3 group-hover:translate-y-0 transition-all duration-300 ease-in">
          <h3 className="font-semibold truncate">{namaProduk}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Toko Medis Jaya Sehat
          </p>
          <span className="font-bold">{displayMoney(harga)}</span>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 mt-2">
          {/* <Button className="w-full" variant="secondary">
              Lihat
            </Button> */}
          {!inCart ? (
            <CartDialog inCart={inCart} onSubmit={handleAddToCart} />
          ) : (
            <Button
              onClick={handleRemoveFromCart}
              className="w-full translate-y-full group-hover:translate-y-0 rounded-none transition-all ease-in duration-300"
            >
              Hapus dari Keranjang
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
