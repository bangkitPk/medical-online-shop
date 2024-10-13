// admin/ProductsPage.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useFetchProducts from "../admin-hooks/useFetchProducts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const { products, loading, error, hasMore } = useFetchProducts(currentPage);
  const navigate = useNavigate();

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (loading && currentPage === 1)
    return <p className="w-full text-center">Loading...</p>;
  if (error) return <p className="w-full text-center">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-primary text-2xl font-bold">Daftar Produk</h1>
        <Button variant="outline" onClick={() => navigate("/add-product")}>
          Tambah Produk
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stok</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
              <TableCell className="font-medium">
                {product.namaProduk}
              </TableCell>
              <TableCell>{product.deskripsi}</TableCell>
              <TableCell>{product.harga}</TableCell>
              <TableCell>{product.stok}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center">
        {/* Tombol Previous */}
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft /> Previous
        </Button>

        <p>Halaman {currentPage}</p>

        {/* Tombol Next */}
        <Button
          onClick={handleNextPage}
          disabled={!hasMore}
          variant="outline"
          className="flex items-center gap-2"
        >
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
