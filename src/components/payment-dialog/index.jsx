import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentDialog({ onSubmit }) {
  const navigate = useNavigate();
  // const makeOrder = () => {
  //   navigate("/pesanan");
  // };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Konfirmasi Pembayaran</Button>
      </DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
          <DialogDescription>
            Periksa kembali informasi pembayaran dan produk yang akan Anda beli.
            Pastikan semua detail sudah benar sebelum membuat pesanan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex sm:justify-center">
          <DialogClose asChild>
            <Button>Cek Kembali</Button>
          </DialogClose>
          <Button variant="secondary" onClick={onSubmit}>
            Buat Pesanan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
