import FilterSidebar from "@/components/filter-sidebar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase.config";
import {
  fetchProducts,
  getTotalProducts,
  resetProducts,
} from "@/redux/slices/productSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";

function BelanjaPage() {
  const dispatch = useDispatch();
  const {
    items: products,
    lastDocId,
    totalProducts,
    isLoading,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(getTotalProducts());
    dispatch(fetchProducts({ lastDoc: null }));

    return () => {
      dispatch(resetProducts());
    };
  }, []);

  const handleShowMore = async () => {
    const lastDocSnapshot = await getDoc(doc(db, "Produk", lastDocId));
    dispatch(fetchProducts({ lastDoc: lastDocSnapshot }));
  };

  return (
    <div className="py-32 px-10 flex">
      <FilterSidebar />
      <div className="flex flex-col  w-full items-center gap-5">
        <div className="ml-14 flex flex-wrap gap-5">
          {products.map((product) => (
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
        {!isLoading && products.length < totalProducts && (
          <Button onClick={handleShowMore} disabled={isLoading}>
            Show More
          </Button>
        )}
      </div>
    </div>
  );
}

export default BelanjaPage;
