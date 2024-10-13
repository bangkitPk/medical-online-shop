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
import useFetchCustomers from "../admin-hooks/useFetchCustomers";

export default function CustomerPage() {
  const { customers, loading, error } = useFetchCustomers();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-layout min-h-screen flex flex-col p-6 bg-white">
      <h1 className="text-primary text-2xl font-bold mb-5"></h1>
      <div className="w-full flex justify-between">
        <h1 className="text-primary text-2xl font-bold mb-5">Customer</h1>
        <p>Jumlah Customer: {customers.length}</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Nama Customer</TableHead>
            <TableHead className="w-[100px]">Email Customer</TableHead>
            <TableHead>Nomor HP</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Alamat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow key={customer.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{customer.nama}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.nomorHP}</TableCell>
              <TableCell className="text-center">
                {customer.gender == "Laki-laki" ? "L" : "P"}
              </TableCell>
              <TableCell>
                {customer.alamat.provinsi}, {customer.alamat["kota-kab"]},{" "}
                {customer.alamat.detail}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
