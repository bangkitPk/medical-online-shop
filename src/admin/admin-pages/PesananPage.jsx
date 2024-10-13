import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import useFetchOrders from "../admin-hooks/useFetchOrders";
import { displayMoney } from "@/helpers/displayMoney";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // Import untuk navigasi

export default function PesananPage() {
  const { orders, loading, error } = useFetchOrders();
  const [users, setUsers] = React.useState({});
  const navigate = useNavigate(); // Hook untuk navigasi

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white max-w-full">
      <div className="w-full flex justify-between">
        <h1 className="text-primary text-2xl font-bold mb-5">Pesanan</h1>
        <p>Jumlah Pesanan: {orders.length}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead className="w-[100px]">Nama Pembeli</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Tanggal Pesanan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => {
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
                backgroundColor = "transparent";
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
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/detail-pesanan/${order.id}`)}
                    className="w-[100px]"
                  >
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
