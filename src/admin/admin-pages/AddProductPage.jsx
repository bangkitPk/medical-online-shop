// AddProductPage.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db, storage } from "@/config/firebase.config";
import { collection, addDoc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [namaProduk, setNamaProduk] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState("");
  const [produkImg, setProdukImg] = useState(null);
  const [tokoList, setTokoList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [selectedToko, setSelectedToko] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokoAndKategori = async () => {
      const tokoSnapshot = await getDocs(collection(db, "Toko"));
      const kategoriSnapshot = await getDocs(collection(db, "Kategori"));

      setTokoList(
        tokoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setKategoriList(
        kategoriSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchTokoAndKategori();
  }, []);

  const handleUploadImage = async (idProduk) => {
    if (!produkImg) return "";
    const imageRef = ref(storage, `productImages/${idProduk}`);
    await uploadBytes(imageRef, produkImg);
    return await getDownloadURL(imageRef);
  };

  const handleAddProduct = async () => {
    try {
      const newProductRef = await addDoc(collection(db, "Produk"), {});
      const imageUrl = await handleUploadImage(newProductRef.id);

      await setDoc(newProductRef, {
        namaProduk,
        harga: parseInt(harga),
        deskripsi,
        stok: parseInt(stok),
        idKategori: selectedKategori,
        idToko: selectedToko,
        produkImg: imageUrl,
        namaProduk_lowercase: namaProduk.toLowerCase(),
      });

      alert("Produk berhasil ditambahkan.");
      navigate("/admin/products");
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Gagal menambahkan produk.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
      <h1 className="text-primary text-2xl font-bold mb-5">
        Tambah Produk Baru
      </h1>

      <div className="grid gap-4">
        <Label>Nama Produk</Label>
        <Input
          value={namaProduk}
          onChange={(e) => setNamaProduk(e.target.value)}
        />

        <Label>Harga</Label>
        <Input
          type="number"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />

        <Label>Deskripsi</Label>
        <Input
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />

        <Label>Stok</Label>
        <Input
          type="number"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />

        <Label>Toko</Label>
        <Select onValueChange={setSelectedToko}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih Toko" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tokoList.map((toko) => (
                <SelectItem key={toko.id} value={toko.id}>
                  {toko.namaToko}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>Kategori</Label>
        <Select onValueChange={setSelectedKategori}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {kategoriList.map((kategori) => (
                <SelectItem key={kategori.id} value={kategori.id}>
                  {kategori.namaKategori}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>Upload Gambar Produk</Label>
        <Input type="file" onChange={(e) => setProdukImg(e.target.files[0])} />

        <Button onClick={handleAddProduct}>Simpan Produk</Button>
      </div>
    </div>
  );
}
