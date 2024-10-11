import ProductFilterSidebar from "@/components/product-filter-sidebar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase.config";
import {
  clearAllProducts,
  clearFilterStates,
  clearSearchStates,
} from "@/redux/slices/productSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import {
  fetchProducts,
  filterProducts,
  getTotalProducts,
  searchProducts,
} from "@/redux/thunks/productThunks";
import { useLocation } from "react-router-dom";
import ProductCardSkeleton from "@/components/product-card-skeleton";

function BelanjaPage() {
  const dispatch = useDispatch();
  const {
    items: products,
    lastDocId,
    searchedProducts,
    filteredProducts,
    totalProducts,
    isLoading,
  } = useSelector((state) => state.products);

  const location = useLocation();

  // Ambil nilai dari query string
  const searchParams = new URLSearchParams(location.search);
  const searchKey = searchParams.get("search");
  const filterCategory = searchParams.get("category");

  useEffect(() => {
    // jika ada query string "search", lakukan pencarian produk
    dispatch(clearSearchStates());
    dispatch(clearFilterStates());

    if (filterCategory) {
      dispatch(filterProducts({ lastDoc: null, filterCategory }));
    } else if (searchKey) {
      dispatch(searchProducts({ lastDoc: null, searchKey }));
    } else {
      dispatch(getTotalProducts());
      dispatch(fetchProducts({ lastDoc: null }));
    }

    return () => {
      dispatch(clearAllProducts());
    };
  }, [dispatch, searchKey, filterCategory]);

  const handleShowMore = async () => {
    let lastDocSnapshot;
    if (filterCategory) {
      lastDocSnapshot = await getDoc(
        doc(db, "Produk", filteredProducts.lastDocId)
      );
      dispatch(filterProducts({ lastDoc: lastDocSnapshot, filterCategory }));
    } else if (searchKey) {
      lastDocSnapshot = await getDoc(
        doc(db, "Produk", searchedProducts.lastDocId)
      );
      dispatch(searchProducts({ lastDoc: lastDocSnapshot, searchKey }));
    } else {
      lastDocSnapshot = await getDoc(doc(db, "Produk", lastDocId));
      // Show more for regular products
      dispatch(fetchProducts({ lastDoc: lastDocSnapshot }));
    }
  };

  return (
    <div className="w-full pb-32 px-10 flex relative">
      <ProductFilterSidebar />
      <div className="flex flex-col w-full items-center gap-5">
        <div className="ml-14 flex flex-wrap gap-5">
          {filteredProducts.category &&
            filteredProducts.items.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                namaProduk={product.namaProduk}
                deskripsi={product.deskripsi}
                harga={product.harga}
                stok={product.stok}
                idToko={product.idToko}
                toko={product.toko}
              />
            ))}
          {searchedProducts.items.length > 0 &&
            searchedProducts.items.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                namaProduk={product.namaProduk}
                deskripsi={product.deskripsi}
                harga={product.harga}
                stok={product.stok}
                idToko={product.idToko}
                toko={product.toko}
              />
            ))}
          {products &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                namaProduk={product.namaProduk}
                deskripsi={product.deskripsi}
                harga={product.harga}
                stok={product.stok}
                idToko={product.idToko}
                toko={product.toko}
              />
            ))}
        </div>
        {console.log(products)}
        {isLoading && <LoaderIcon className="animate-spin" />}

        {!isLoading &&
          ((filterCategory &&
            filteredProducts.items.length < filteredProducts.total) ||
            (searchKey &&
              searchedProducts.items.length < searchedProducts.total) ||
            (!searchKey &&
              !filterCategory &&
              products.length < totalProducts)) && (
            <Button onClick={handleShowMore} disabled={isLoading}>
              Show More
            </Button>
          )}
      </div>
    </div>
  );
}
export default BelanjaPage;
