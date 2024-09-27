import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

function PaymentPage() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    alamat: "",
    nomorTelepon: "",
    metodePembayaran: "paypal", // default to PayPal
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMetodeBayar = (value) => {
    setFormData({
      ...formData,
      metodePembayaran: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="w-screen flex justify-center px-10 gap-10">
      <div className="w-3/4 ">
        <h2 className="font-extrabold">Informasi Pembayaran</h2>
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            {/* Payment FORM */}
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

          <div className="flex flex-col">
            <Label htmlFor="alamat" className="font-semibold mb-1">
              Alamat
            </Label>
            <Input
              type="text"
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className="border p-2 rounded"
              required
              placeholder="Masukkan alamat lengkap"
            />
          </div>

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

          <div className="flex flex-col">
            <Label htmlFor="option-one">Metode Pembayaran</Label>
            <RadioGroup
              className="flex mt-3"
              value={formData.metodePembayaran}
              onValueChange={handleMetodeBayar}
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
      <div className="w-1/4 border-2 p-3">
        <h2 className="text-lg font-bold mb-5">Ringkasan Pembelian</h2>
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>Rp 1.000.000</p>
        </div>
        <div className="flex justify-between">
          <p>Diskon</p>
          <p>Rp 300.000</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>Rp 700.000</p>
        </div>
        <Button className="w-full mt-10">Beli</Button>
      </div>
    </div>
  );
}

export default PaymentPage;
