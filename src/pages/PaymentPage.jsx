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

function PaymentPage() {
  const userCart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.user?.uid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    namaLengkap: "",
    alamat: {
      provinsi: "",
      "kota-kab": "",
      detail: "",
    },
    nomorTelepon: "",
    metodePembayaran: "paypal",
  });

  const { provinces, cities, fetchCities, loading, error } = useFetchRegions(); // Fetch regions

  useEffect(() => {
    if (userCart.selectedProducts.length === 0) {
      navigate("/keranjang");
      return;
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAlamatChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      alamat: {
        ...prevData.alamat,
        [name]: value,
      },
    }));
  };

  // Handle province selection and trigger city fetch
  const handleProvinsiChange = (provinceSelected) => {
    let provinceId = provinces.find(
      (provinsi) => provinsi.name === provinceSelected
    )?.id;

    handleAlamatChange("provinsi", provinceSelected);
    fetchCities(provinceId);
  };

  const handleKotaChange = (cityId) => {
    handleAlamatChange("kota-kab", cityId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.namaLengkap ||
      !formData.alamat.provinsi ||
      !formData.alamat["kota-kab"] ||
      !formData.alamat.detail ||
      !formData.nomorTelepon ||
      !formData.metodePembayaran
    ) {
      alert("Lengkapi semua data sebelum melanjutkan pembayaran.");
      return;
    }
    // Logika untuk menambah order
    const ordersPromises = userCart.selectedProducts.map((produk) => {
      const orderData = {
        produk,
        userId: userId,
        metodeBayar: formData.metodePembayaran,
        alamatKirim: formData.alamat,
      };

      return dispatch(addOrder(orderData));
    });

    // hapus produk yang dibeli dari keranjang
    const removeCartPromises = userCart.selectedProducts.map((product) => {
      return dispatch(
        removeFromCart({ userId: userId, productId: product.id })
      );
    });

    try {
      await Promise.all(ordersPromises);
      await Promise.all(removeCartPromises);

      toast({
        variant: "success",
        title: "Pembayaran anda berhasil.",
      });
      navigate("/pesanan");
    } catch (error) {
      console.error("Gagal menambahkan order:", error);
      alert("Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex justify-center px-10 gap-10">
      <div className="w-7/12 ">
        <h2 className="font-extrabold">Informasi Pembayaran</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Nama Lengkap */}
          <div className="flex flex-col">
            <Label htmlFor="namaLengkap" className="font-semibold mb-1">
              Nama Lengkap
            </Label>
            <Input
              type="text"
              id="namaLengkap"
              name="namaLengkap"
              value={formData.namaLengkap}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Input Alamat Pengiriman */}
          <Label className="font-semibold">Alamat Pengiriman</Label>

          {/* Provinsi dan Kota */}
          <div className="flex gap-10 ml-2">
            <div className="flex flex-col">
              <Label htmlFor="provinsi" className="font-semibold mb-1">
                Provinsi
              </Label>
              <InputCombobox
                data={provinces}
                field="Provinsi"
                onChange={handleProvinsiChange}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="kota-kab" className="font-semibold mb-1">
                Kota/Kabupaten
              </Label>
              <InputCombobox
                data={cities}
                field="Kabupaten/Kota"
                onChange={handleKotaChange}
              />
            </div>
          </div>

          {/* Detail Alamat */}
          <div className="flex flex-col ml-2">
            <Label htmlFor="detail" className="font-semibold mb-1">
              Detail Alamat (Jalan/Gang/Desa, dll.)
            </Label>
            <Input
              type="text"
              id="detail"
              name="detail"
              value={formData.alamat.detail}
              onChange={(e) => handleAlamatChange("detail", e.target.value)}
              className="border p-2 rounded"
              required
              placeholder="Masukkan detail alamat"
            />
          </div>

          {/* Nomor Telepon */}
          <div className="flex flex-col">
            <Label htmlFor="nomorTelepon" className="font-semibold mb-1">
              Nomor Telepon (HP)
            </Label>
            <Input
              type="tel"
              id="nomorTelepon"
              name="nomorTelepon"
              value={formData.nomorTelepon}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Metode Pembayaran */}
          <div className="flex flex-col">
            <Label htmlFor="option-one">Metode Pembayaran</Label>
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Bayar Langsung" id="option-two" />
                <Label htmlFor="option-two">Bayar Langsung di Toko</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
      <div className="w-5/12 h-fit p-3 bg-secondary">
        <h2 className="text-lg font-bold mb-5">Ringkasan Pembelian</h2>
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
