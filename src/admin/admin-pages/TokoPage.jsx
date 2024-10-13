// TokoPage.jsx
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import useFetchToko from "../admin-hooks/useFetchToko";

export default function TokoPage() {
  const { toko, loading, error } = useFetchToko();
  const [namaToko, setNamaToko] = useState("");
  const [lokasi, setLokasi] = useState("");

  const handleCreateStore = async () => {
    try {
      const tokoCollectionRef = collection(db, "Toko");
      // buat dokumen baru ke koleksi "Toko"
      await addDoc(tokoCollectionRef, { namaToko, lokasi });
      alert("Toko baru berhasil ditambahkan.");
      setNamaToko("");
      setLokasi("");
    } catch (error) {
      console.error("Gagal menambahkan toko baru:", error);
      alert("Gagal menambahkan toko baru.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="w-full flex justify-between items-center mb-5">
        <h1 className="text-primary text-2xl font-bold">Daftar Toko</h1>
        <div className="flex items-center gap-4">
          <p>Jumlah Toko: {toko.length}</p>
          {/* Dialog untuk Buat Toko Baru */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Buat Toko Baru</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Buat Toko Baru</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="namaToko" className="text-right">
                    Nama Toko
                  </Label>
                  <Input
                    id="namaToko"
                    value={namaToko}
                    onChange={(e) => setNamaToko(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lokasi" className="text-right">
                    Lokasi
                  </Label>
                  <Input
                    id="lokasi"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateStore}
                  disabled={!namaToko || !lokasi}
                >
                  Simpan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
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
