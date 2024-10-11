import { displayMoney } from "@/helpers/displayMoney";
import { useSelector } from "react-redux";

export default function PaymentProductList() {
  const userCart = useSelector((state) => state.cart);
  console.log("product: ");
  console.log(userCart.products);
  console.log("selected product: ");
  console.log(userCart.selectedProducts);
  return (
    <ul>
      {userCart?.selectedProducts.map((product) => (
        <li
          className="p-2 text-sm w-full flex justify-between items-center"
          key={product.id}
        >
          <div>
            <p>
              {product.namaProduk} <b>{product.jumlah}X</b>
            </p>
            <p>
              Toko:{" "}
              <span className="text-primary">{product.toko.namaToko}</span>
            </p>
            <p>
              Lokasi Toko:{" "}
              <span className="text-primary">{product.toko.lokasi}</span>
            </p>
          </div>
          <p className="font-bold">{displayMoney(product.total)}</p>
        </li>
      ))}
    </ul>
  );
}
