import FilterSidebar from "@/components/filter-sidebar";
import ProductCard from "@/components/product-card";

function SearchProductPage() {
  return (
    <div className="pt-32 px-10 flex">
      <FilterSidebar />
      <div className="ml-14 flex flex-wrap gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default SearchProductPage;
