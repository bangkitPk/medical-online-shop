import FilterSidebar from "@/components/filter-sidebar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase.config";
import { clearAllProducts } from "@/redux/slices/productSlice";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderIcon } from "lucide-react";
import {
  fetchProducts,
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
    totalProducts,
    isLoading,
  } = useSelector((state) => state.products);

  const location = useLocation();

  // Ambil nilai dari query string
  const searchParams = new URLSearchParams(location.search);
  const searchKey = searchParams.get("search");

  useEffect(() => {
    // jika ada query string "search", lakukan pencarian produk
    if (searchKey) {
      dispatch(searchProducts({ lastDoc: null, searchKey }));
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
    let lastDocSnapshot;
    if (searchKey) {
      lastDocSnapshot = await getDoc(
        doc(db, "Produk", searchedProducts.lastDocId)
      );
      // Show more for searched products
      dispatch(searchProducts({ lastDoc: lastDocSnapshot, searchKey }));
    } else {
      lastDocSnapshot = await getDoc(doc(db, "Produk", lastDocId));
      // Show more for regular products
      dispatch(fetchProducts({ lastDoc: lastDocSnapshot }));
    }
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
        {console.log(products)}
        {isLoading && <LoaderIcon className="animate-spin" />}

        {!isLoading &&
          ((searchKey &&
            searchedProducts.items.length < searchedProducts.total) ||
            (!searchKey && products.length < totalProducts)) && (
            <Button onClick={handleShowMore} disabled={isLoading}>
              Show More
            </Button>
          )}
      </div>
    </div>
  );
}

// function BelanjaPage() {
//   const dispatch = useDispatch();
//   const {
//     items: products,
//     lastDocId,
//     searchedProducts,
//     totalProducts,
//     isLoading,
//   } = useSelector((state) => state.products);

//   const expectedProductCount = 12; // Expected number of products per page
//   const [skeletonArray, setSkeletonArray] = useState(
//     new Array(expectedProductCount).fill(0)
//   );

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const searchKey = searchParams.get("search");

//   useEffect(() => {
//     if (searchKey) {
//       dispatch(searchProducts(searchKey));
//     } else {
//       if (products.length === 0) {
//         dispatch(clearAllProducts());
//       }
//       dispatch(getTotalProducts());
//       dispatch(fetchProducts({ lastDoc: null }));
//     }

//     return () => {
//       if (!searchKey) {
//         dispatch(clearAllProducts());
//       }
//     };
//   }, [dispatch, searchKey]);

//   const handleShowMore = async () => {
//     const lastDocSnapshot = await getDoc(doc(db, "Produk", lastDocId));
//     dispatch(fetchProducts({ lastDoc: lastDocSnapshot }));
//   };

//   // useEffect(() => {
//   //   // Adjust the number of skeletons based on products count
//   //   if (isLoading) {
//   //     const count = Math.max(expectedProductCount, products.length);
//   //     setSkeletonArray(new Array(count).fill(0));
//   //   }
//   // }, [isLoading, products]);

//   return (
//     <div className="pb-32 w-screen px-10 flex">
//       <FilterSidebar />
//       <div className="flex flex-col w-full items-center gap-5 ">
//         <div className="ml-14 flex flex-wrap gap-5">
//           {/* Render skeletons when loading */}
//           {/* {isLoading &&
//             !searchKey &&
//             products.length < 12 &&
//             skeletonArray.map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))} */}

//           {/* Render products when not loading and no search key */}
//           {!isLoading &&
//             !searchKey &&
//             products.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 namaProduk={product.namaProduk}
//                 deskripsi={product.deskripsi}
//                 harga={product.harga}
//                 stok={product.stok}
//               />
//             ))}

//           {/* Render searched products if searchKey exists */}
//           {searchedProducts.items.length > 0 &&
//             searchKey &&
//             searchedProducts.items.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 namaProduk={product.namaProduk}
//                 deskripsi={product.deskripsi}
//                 harga={product.harga}
//                 stok={product.stok}
//               />
//             ))}
//         </div>

//         {/* Show loader icon while loading */}
//         {isLoading && <LoaderIcon className="animate-spin" />}

//         {/* Show 'Show More' button if there are more products to load */}
//         {(!isLoading && products.length < totalProducts) ||
//         (searchedProducts.items.length < searchedProducts.total &&
//           searchKey) ? (
//           <Button onClick={handleShowMore} disabled={isLoading}>
//             Show More
//           </Button>
//         ) : null}
//       </div>
//     </div>
//   );
// }
export default BelanjaPage;
