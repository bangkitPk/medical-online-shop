import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ProductCell } from "./ProductCell";
import { AddQuantityButton } from "./AddQuantityButton";
import { RemoveProductButton } from "./RemoveProductButton";
import { displayMoney } from "@/helpers/displayMoney";

export default function CartTable() {
  const cartProducts = useSelector((state) => state.cart.products);

  return (
    <div className="w-3/4 shadow-lg rounded-lg overflow-y-auto h-80">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Produk</TableHead>
            <TableHead className="font-bold">Harga</TableHead>
            <TableHead className="font-bold text-center">Jumlah</TableHead>
            <TableHead className="font-bold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartProducts.length > 0
            ? cartProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <ProductCell produk={item} />
                  </TableCell>
                  <TableCell>{displayMoney(item.harga)}</TableCell>
                  <TableCell>
                    <AddQuantityButton product={item} />
                  </TableCell>
                  <TableCell className="flex justify-between">
                    <span>{displayMoney(item.total)}</span>
                    <RemoveProductButton product={item} />
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
}
