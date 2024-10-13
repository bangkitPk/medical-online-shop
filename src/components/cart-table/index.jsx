import { useDispatch, useSelector } from "react-redux";
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
import { EditQuantityButton } from "./EditQuantityButton";
import { RemoveProductButton } from "./RemoveProductButton";
import { displayMoney } from "@/helpers/displayMoney";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { setSelectedProducts } from "@/redux/slices/cartSlice";

export default function CartTable() {
  const userCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // const [selectedProducts, setSelectedProducts] = useState([]);

  // const handleCheckboxChange = (productId) => {
  //   dispatch(setSelectedProducts)
  // };

  // select semua baris
  const handleSelectAll = (checked) => {
    dispatch(setSelectedProducts({ allProducts: checked }));
  };

  return (
    <div className="max-sm:hidden w-3/4 shadow-lg rounded-lg overflow-y-auto max-h-80">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={
                  userCart?.selectedProducts.length ===
                  userCart?.products.length
                }
                onCheckedChange={(value) => handleSelectAll(value)}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="font-bold">Produk</TableHead>
            <TableHead className="font-bold">Harga</TableHead>
            <TableHead className="font-bold text-center">Jumlah</TableHead>
            <TableHead className="font-bold">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userCart.products.length > 0
            ? userCart.products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={userCart?.selectedProducts.some(
                        (p) => p.id === item.id
                      )}
                      onCheckedChange={() =>
                        dispatch(setSelectedProducts({ product: item }))
                      }
                      aria-label={`Select ${item.namaProduk}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <ProductCell produk={item} />
                  </TableCell>
                  <TableCell>{displayMoney(item.harga)}</TableCell>
                  <TableCell>
                    <EditQuantityButton product={item} />
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
