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

export default function CartDialog({ inCart, onSubmit }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="max-sm:text-xs w-full translate-y-full group-hover:translate-y-0 rounded-none transition-all ease-in duration-300"
        >
          Tambah ke Keranjang
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Tambah Produk ke Keranjang</DialogTitle>
          <DialogDescription>
            Masukkan jumlah produk yang diinginkan
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          <div className="flex-1 gap-2">
            <Input
              type="number"
              value={quantity}
              className="border-primary focus:border-none"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex sm:justify-center">
          <DialogClose asChild>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => {
                let intQuantity = parseInt(quantity);
                onSubmit(intQuantity);
              }}
            >
              Tambah Produk
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
