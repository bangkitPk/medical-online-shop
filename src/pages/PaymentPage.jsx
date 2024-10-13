import InputCombobox from "@/components/input-combobox";
import PaymentDialog from "@/components/payment-dialog";
import PaymentProductList from "@/components/payment-product-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { displayMoney } from "@/helpers/displayMoney";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRegions } from "@/hooks/useFetchAlamat"; // Import the hook
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addOrder } from "@/redux/thunks/orderThunk";
import { removeFromCart } from "@/redux/thunks/cartThunk";
import { removeProduct } from "@/redux/slices/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { sendOrderReceipt } from "@/services";
import { MapPin } from "lucide-react";

function PaymentPage() {
  const userCart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    metodePembayaran: "paypal",
  });

  const [isLocationMismatch, setIsLocationMismatch] = useState(false);

  useEffect(() => {
    if (userCart.selectedProducts.length === 0) {
      navigate("/keranjang");
      return;
    }
    console.log(user);

    checkLocationMismatch();
  }, [userCart.selectedProducts, user.alamat["kota-kab"]]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkLocationMismatch = () => {
    const buyerCity = user.alamat["kota-kab"].toLowerCase();
    const hasMismatch = userCart.selectedProducts.some(
      (product) => product.toko.lokasi.toLowerCase() !== buyerCity
    );

    setIsLocationMismatch(hasMismatch);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.nama ||
      !user.alamat.provinsi ||
      !user.alamat["kota-kab"] ||
      !user.alamat.detail ||
      !user.nomorHP ||
      !formData.metodePembayaran
    ) {
      alert("Lengkapi semua data sebelum melanjutkan pembayaran.");
      return;
    }
    // Logika untuk menambah order
    const ordersPromises = userCart.selectedProducts.map((produk) => {
      const orderData = {
        produk,
        userId: user.uid,
        metodeBayar: formData.metodePembayaran,
        alamatKirim: user.alamat,
      };

      return dispatch(addOrder(orderData));
    });

    // hapus produk yang dibeli dari keranjang
    const removeCartPromises = userCart.selectedProducts.map((product) => {
      return dispatch(
        removeFromCart({ userId: user.uid, productId: product.id })
      );
    });

    try {
      await Promise.all(ordersPromises);
      await Promise.all(removeCartPromises);

      console.log("pembelian berhasil");
      navigate("/pesanan");

      const orderProducts = userCart.selectedProducts.map((product) => ({
        namaProduk: product.namaProduk,
        harga: displayMoney(product.harga),
        jumlah: product.jumlah,
      }));

      const orderData = {
        userName: user.nama,
        nomorHP: user.nomorHP,
        products: orderProducts,
        total: displayMoney(userCart.totalBiaya),
        alamat: user.alamat,
        paymentMethod: formData.metodePembayaran,
        paypalID: user.paypalID,
      };

      const userEmail = user.email;

      await sendOrderReceipt(orderData, userEmail); // kirim pdf laporan pembelian user
      toast({
        variant: "success",
        title: "Pembayaran anda berhasil.",
        description: "Laporan pembelian telah dikirimkan ke emailmu",
      });
    } catch (error) {
      console.error("Gagal menambahkan order:", error);
      alert("Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.");
    }
  };

  return (
    <div className="max-sm:pt-5 flex max-sm:flex-col justify-center px-10 max-sm:px-0 gap-10 pb-10">
      <div className="w-7/12 max-sm:w-full max-sm:px-10">
        <h2 className="font-extrabold max-sm:mb-5 max-sm:text-center">
          Informasi Pembayaran
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Nama Lengkap */}

          {/* Input Alamat Pengiriman */}
          <div>
            <Label className="font-semibold">Alamat Pengiriman</Label>

            <div className="bg-white border rounded-sm p-3">
              <div className="flex gap-3 mb-3">
                <MapPin className="text-primary" />
                <p className="font-bold">{user?.nama}</p>
              </div>
              <p>{user?.alamat.provinsi}</p>
              <p>{user?.alamat["kota-kab"]}</p>
              <p>{user?.alamat.detail}</p>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="flex flex-col">
            <Label htmlFor="option-one">Metode Pembayaran</Label>
            {!isLocationMismatch && (
              <p className="text-primary font-bold text-sm">
                Anda dapat membayar langsung di toko karena berada di kota yang
                sama dengan toko.
              </p>
            )}
            <RadioGroup
              className="flex mt-3"
              value={formData.metodePembayaran}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, metodePembayaran: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="option-one" />
                <Label htmlFor="option-one">PayPal</Label>
              </div>
              {!isLocationMismatch && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bayar Langsung" id="option-two" />
                  <Label htmlFor="option-two">Bayar Langsung di Toko</Label>
                </div>
              )}
            </RadioGroup>
          </div>
        </form>
      </div>
      <div className="w-5/12 h-fit p-3 bg-secondary max-sm:w-full">
        <h2 className="text-lg font-bold mb-5 max-sm:text-center">
          Ringkasan Pembelian
        </h2>
        {/* Ringkasan Pembelian */}
        <PaymentProductList />
        <div className="flex justify-between font-bold mt-10">
          <p>Total Biaya</p>
          <p>{displayMoney(userCart.totalBiaya)}</p>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <PaymentDialog onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
