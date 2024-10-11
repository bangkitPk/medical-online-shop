import { displayMoney } from "@/helpers/displayMoney";
import { useSelector } from "react-redux";

export default function PaymentProductList() {
  const userCart = useSelector((state) => state.cart);
  return (
    <ul>
      {userCart?.selectedProducts.map((product) => (
        <li
          className="p-2 text-sm w-full flex justify-between items-center"
          key={product.id}
        >
          <p className="">
            {product.namaProduk} <b>{product.jumlah}X</b>
          </p>
          <p className="font-bold">{displayMoney(product.total)}</p>
        </li>
      ))}
    </ul>
  );
}
