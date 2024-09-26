import FilterSidebar from "@/components/filter-sidebar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase.config";
import { clearAllProducts } from "@/redux/slices/productSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import {
  fetchProducts,
  getTotalProducts,
  searchProducts,
} from "@/redux/thunks/productThunks";
import { useLocation } from "react-router-dom";

function BelanjaPage() {
  const dispatch = useDispatch();
  const {
    items: products,
    lastDocId,
    searchedProducts,
    totalProducts,
    isLoading,
  } = useSelector((state) => state.products);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKey = searchParams.get("search");

  useEffect(() => {
    if (searchKey) {
      dispatch(searchProducts(searchKey));
    } else {
      dispatch(clearAllProducts());
      dispatch(getTotalProducts());
      dispatch(fetchProducts({ lastDoc: null }));
    }

    return () => {
      dispatch(clearAllProducts());
    };
  }, [dispatch, searchKey]);

  const handleShowMore = async () => {
    const lastDocSnapshot = await getDoc(doc(db, "Produk", lastDocId));
    dispatch(fetchProducts({ lastDoc: lastDocSnapshot }));
  };

  return (
    <div className="pb-32 w-screen px-10 flex">
      <FilterSidebar />
      <div className="flex flex-col w-full items-center gap-5">
        <div className="ml-14 flex flex-wrap gap-5">
          {searchedProducts.items.length > 0
            ? searchedProducts.items.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  namaProduk={product.namaProduk}
                  deskripsi={product.deskripsi}
                  harga={product.harga}
                  stok={product.stok}
                />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  namaProduk={product.namaProduk}
                  deskripsi={product.deskripsi}
                  harga={product.harga}
                  stok={product.stok}
                />
              ))}
        </div>
        {isLoading && <LoaderIcon className="animate-spin" />}
        {(!isLoading && products.length < totalProducts) ||
        searchedProducts.items.length < searchedProducts.total ? (
          <Button onClick={handleShowMore} disabled={isLoading}>
            Show More
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default BelanjaPage;
