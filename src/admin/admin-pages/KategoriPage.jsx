// KategoriPage.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/config/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function KategoriPage() {
  const [kategoriList, setKategoriList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [namaKategori, setNamaKategori] = useState("");
  const [selectedKategori, setSelectedKategori] = useState(null);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    const kategoriSnapshot = await getDocs(collection(db, "Kategori"));
    setKategoriList(
      kategoriSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const handleAddOrUpdateKategori = async () => {
    try {
      if (selectedKategori) {
        // edit Kategori
        await updateDoc(doc(db, "Kategori", selectedKategori.id), {
          namaKategori,
        });
      } else {
        // add Kategori
        await addDoc(collection(db, "Kategori"), {
          namaKategori,
        });
      }

      setNamaKategori("");
      setSelectedKategori(null);
      setDialogOpen(false);
      fetchKategori();
    } catch (error) {
      console.error("Gagal menambah/mengedit kategori:", error);
    }
  };

  const handleDeleteKategori = async (id) => {
    try {
      await deleteDoc(doc(db, "Kategori", id));
      fetchKategori();
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
    }
  };

  const openEditDialog = (kategori) => {
    setNamaKategori(kategori.namaKategori);
    setSelectedKategori(kategori);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setNamaKategori("");
    setSelectedKategori(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <div className="w-full flex justify-between">
        <h1 className="text-primary text-2xl font-bold mb-5">
          Daftar Kategori
        </h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="mb-4 ">
              Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedKategori ? "Edit Kategori" : "Tambah Kategori"}
              </DialogTitle>
              <DialogDescription>
                {selectedKategori
                  ? "Edit nama kategori yang dipilih"
                  : "Tambah kategori baru"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="kategori" className="text-right">
                  Nama Kategori
                </Label>
                <Input
                  id="kategori"
                  value={namaKategori}
                  onChange={(e) => setNamaKategori(e.target.value)}
                  placeholder="Masukkan nama kategori"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddOrUpdateKategori}>
                {selectedKategori ? "Simpan Perubahan" : "Tambah Kategori"}
              </Button>
              <Button onClick={() => setDialogOpen(false)} variant="secondary">
                Batal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Kategori</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kategoriList.map((kategori) => (
            <TableRow key={kategori.id}>
              <TableCell>{kategori.namaKategori}</TableCell>
              <TableCell>
                <Button
                  onClick={() => openEditDialog(kategori)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteKategori(kategori.id)}
                  variant="destructive"
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
