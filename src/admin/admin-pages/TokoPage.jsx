// TokoPage.jsx
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
} from "@/components/ui/table";
import useFetchToko from "../admin-hooks/useFetchToko";

export default function TokoPage() {
  const { toko, loading, error } = useFetchToko();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="w-full flex justify-between">
        <h1 className="text-primary text-2xl font-bold mb-5">Daftar Toko</h1>
        <p>Jumlah Toko: {toko.length}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Nama Toko</TableHead>
            <TableHead>Lokasi Toko</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {toko.map((store, index) => (
            <TableRow key={store.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{store.namaToko}</TableCell>
              <TableCell>{store.lokasi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
