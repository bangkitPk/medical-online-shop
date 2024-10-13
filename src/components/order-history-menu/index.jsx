import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useDispatch, useSelector } from "react-redux";
import { filterOrders } from "@/redux/slices/orderSlice";

export default function OrderHistoryMenu() {
  const { orders, loading } = useSelector((state) => state.order);
  const [activeItem, setActiveItem] = useState("semua");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && orders.length > 0) {
      dispatch(filterOrders("semua"));
    }
  }, [loading, orders, dispatch]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    dispatch(filterOrders(itemName));
  };

  return (
    <NavigationMenu className="bg-white text-lg max-sm:text-base max-sm:w-full max-sm:overflow-x-auto scrollbar-hide">
      <NavigationMenuList className="max-sm:w-max max-sm:ml-[20rem]">
        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "semua"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("semua")}
        >
          <NavigationMenuLink>Semua</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "belum dibayar"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("belum dibayar")}
        >
          <NavigationMenuLink>Belum Dibayar</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "diproses"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("diproses")}
        >
          <NavigationMenuLink>Diproses</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "dikirim"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("dikirim")}
        >
          <NavigationMenuLink>Dikirim</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "selesai"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("selesai")}
        >
          <NavigationMenuLink>Selesai</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "dibatalkan"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("dibatalkan")}
        >
          <NavigationMenuLink>Dibatalkan</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
