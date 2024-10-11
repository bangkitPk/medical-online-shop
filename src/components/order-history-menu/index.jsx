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
  const [activeItem, setActiveItem] = useState("Semua");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && orders.length > 0) {
      dispatch(filterOrders("Semua"));
    }
  }, [loading, orders, dispatch]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    dispatch(filterOrders(itemName));
  };

  return (
    <NavigationMenu className="bg-white text-lg">
      <NavigationMenuList>
        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Semua"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Semua")}
        >
          <NavigationMenuLink>Semua</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Belum Dibayar"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Belum Dibayar")}
        >
          <NavigationMenuLink>Belum Dibayar</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Diproses"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Diproses")}
        >
          <NavigationMenuLink>Diproses</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Dikirim"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Dikirim")}
        >
          <NavigationMenuLink>Dikirim</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Selesai"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Selesai")}
        >
          <NavigationMenuLink>Selesai</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem
          className={`hover:text-primary px-5 py-2 ${
            activeItem === "Dibatalkan"
              ? "border-b-2 border-primary text-primary"
              : ""
          }`}
          onClick={() => handleItemClick("Dibatalkan")}
        >
          <NavigationMenuLink>Dibatalkan</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
