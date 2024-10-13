import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import komponen tabel dari shadcn
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import useFetchOrders from "../admin-hooks/useFetchOrders";
import useUpdateOrderStatus from "../admin-hooks/useUpdateOrderStatus";
import { displayMoney } from "@/helpers/displayMoney";
import { Button } from "@/components/ui/button";

export default function PesananPage() {
  const { orders, loading, error } = useFetchOrders();
  const {
    updateOrderStatus,
    loading: updating,
    error: updateError,
  } = useUpdateOrderStatus();

  // State untuk menyimpan data pengguna
  const [users, setUsers] = React.useState({});

  // Ambil data pengguna hanya sekali saat komponen pertama kali dimuat
  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "Users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = {};
      usersSnapshot.docs.forEach((doc) => {
        usersData[doc.id] = doc.data();
      });
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleUpdateStatus = async (orderId) => {
    const success = await updateOrderStatus(orderId, "dikirim");
    if (success) {
      alert("Status pesanan berhasil diperbarui.");
    } else {
      alert("Gagal memperbarui status pesanan.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="w-full flex justify-between">
        <h1 className="text-primary text-2xl font-bold mb-5">Pesanan</h1>
        <p>Jumlah Pesanan: {orders.length}</p>
      </div>
      {updating && <p>Memperbarui status...</p>}
      {updateError && <p>Error: {updateError}</p>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead className="w-[100px]">Nama Pembeli</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Jumlah Produk</TableHead>
            <TableHead>Nama Toko</TableHead>
            <TableHead>Metode Bayar</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Tanggal Pesanan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
            // Menentukan warna latar belakang berdasarkan status
            let backgroundColor;
            let color;
            switch (order.status) {
              case "diproses":
                backgroundColor = "yellow";
                color = "black";
                break;
              case "dikirim":
                backgroundColor = "blue";
                color = "white";
                break;
              case "selesai":
                backgroundColor = "green";
                color = "white";
                break;
              case "dibatalkan":
                backgroundColor = "red";
                color = "white";
                break;
              case "belum dibayar":
                backgroundColor = "orange";
                color = "black";
                break;
              default:
                backgroundColor = "transparent"; // Warna default jika status tidak dikenal
            }

            return (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <p className="truncate">
                    {users[order.userId]?.nama || "Tidak Diketahui"}
                  </p>
                </TableCell>
                <TableCell>{order.produk.namaProduk}</TableCell>
                <TableCell>{order.produk.jumlah}</TableCell>
                <TableCell>{order.produk.toko.namaToko}</TableCell>
                <TableCell>{order.metodeBayar}</TableCell>
                <TableCell>{displayMoney(order.produk.total)}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>
                  <p
                    style={{ backgroundColor, color }}
                    className="p-1 text-center rounded-sm"
                  >
                    {order.status}
                  </p>
                </TableCell>
                <TableCell>
                  {order.status === "diproses" && (
                    <Button
                      variant="outline"
                      onClick={() => handleUpdateStatus(order.id)}
                    >
                      Tandai Dikirim
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
