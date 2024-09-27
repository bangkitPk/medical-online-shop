import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "@/redux/thunks/productThunks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SearchInput() {
  const dispatch = useDispatch();
  const searchedProducts = useSelector(
    (state) => state.products.searchedProducts.items
  );

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchKeyParam = searchParams.get("search");

  const [searchKey, setSearchKey] = useState(searchKeyParam || "");

  useEffect(() => {
    if (searchKeyParam) {
      setSearchKey(searchKeyParam);
    }
  }, [searchKeyParam]);

  useEffect(() => {
    if (searchedProducts.length > 0) {
      console.log(searchedProducts);
    }
  }, [searchedProducts]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchKey !== "") {
        navigate(`/belanja?search=${searchKey}`);
      } else {
        navigate(`/belanja`);
      }
    }
  };

  return (
    <div className="flex h-10 w-1/2 items-center rounded-2xl border border-ring bg-white pl-3 text-sm ring-offset-u focus-within:ring-1 focus-within:ring-primary">
      <Search />
      <Input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="Cari produk..."
        className="w-full h-4/5 border-0 rounded-2xl ring-offset-0 p-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
}
