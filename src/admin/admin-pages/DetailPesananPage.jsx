import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { displayMoney } from "@/helpers/displayMoney";
import { Button } from "@/components/ui/button";

export default function DetailPesananPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = doc(db, "Order", orderId);
        const orderSnapshot = await getDoc(orderDoc);
        if (orderSnapshot.exists()) {
          // Ambil data pengguna berdasarkan userId dari pesanan
          const userDoc = doc(db, "Users", orderSnapshot.data().userId);
          const userSnapshot = await getDoc(userDoc);
          setOrder({
            id: orderSnapshot.id,
            namaUser: userSnapshot.data().nama,
            ...orderSnapshot.data(),
          });
        } else {
          setError("Pesanan tidak ditemukan.");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      const orderDoc = doc(db, "Order", orderId);
      await updateDoc(orderDoc, { status: newStatus });
      setOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      alert("Status pesanan berhasil diperbarui.");
    } catch (err) {
      alert("Gagal memperbarui status pesanan.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>Pesanan tidak ditemukan.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-primary text-3xl font-bold mb-6 text-center">
          Detail Pesanan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Informasi Pembeli</h2>
            <p className="text-gray-700">Nama: {order.namaUser}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Informasi Produk</h2>
            <p className="text-gray-700">
              Nama Produk: {order.produk.namaProduk}
            </p>
            <p className="text-gray-700">Jumlah: {order.produk.jumlah}</p>
            <p className="text-gray-700">Toko: {order.produk.toko.namaToko}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Detail Pembayaran</h2>
            <p className="text-gray-700">
              Total: {displayMoney(order.produk.total)}
            </p>
            <p className="text-gray-700">Metode: {order.metodeBayar}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Status Pesanan</h2>
            <p className="text-gray-700">Tanggal: {order.createdAt}</p>
            <p className="text-gray-700">Status: {order.status}</p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => handleUpdateStatus("dikirim")}
          >
            Tandai Dikirim
          </Button>
        </div>
      </div>
    </div>
  );
}
