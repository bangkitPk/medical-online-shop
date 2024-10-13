import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCategories } from "@/redux/thunks/categoryThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductFilterSidebar() {
  const categories = useSelector((state) => state.category.categories);
  const [sidebarTop, setSidebarTop] = useState(20); // default top px
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryFilter = (categoryId) => {
    navigate(`?category=${categoryId}`);
  };

  const handleScroll = () => {
    if (window.innerWidth < 640) return;
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      // scroll up
      setSidebarTop(100);
    } else if (prevScrollPos < currentScrollPos) {
      // scroll down
      setSidebarTop(20);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    dispatch(getCategories())
      .unwrap()
      .then((categories) => {
        console.log("Fetched categories:", categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [dispatch]);

  return (
    <div
      className="max-sm:relative sticky top-[15px] h-fit transition-all duration-300"
      style={{ top: `${sidebarTop}px` }}
    >
      <span className="font-bold">Filter</span>
      <Accordion type="single" collapsible className="w-52 px-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="font-bold">Kategori</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3">
              {categories ? (
                categories.map((category) => (
                  <li
                    key={category.id}
                    className="cursor-pointer hover:bg-muted py-2"
                    onClick={() => handleCategoryFilter(category.id)}
                  >
                    {category.namaKategori}
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
