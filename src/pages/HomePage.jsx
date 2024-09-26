import headerImage1 from "@/assets/images/header-1.svg";
import headerImage2 from "@/assets/images/header-2.svg";
import headerImage3 from "@/assets/images/header-3.svg";
import { useSelector } from "react-redux";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from "react";

function HomePage() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const cart = useSelector((state) => state.cart);

  const [isHovered, setIsHovered] = useState(false);

  // Event handler untuk saat mouse masuk dan keluar
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const headerTexts = [
    "Perlengkapan Medis Terbaik untuk Kesehatan Anda",
    "Belanja Praktis dan Aman dari Rumah",
    "Harga Terjangkau, Kualitas Terjamin",
  ];

  const headerImages = [headerImage1, headerImage2, headerImage3];

  return (
    <main>
      <header className="w-full flex justify-center">
        <Carousel
          plugins={[autoplay.current]}
          className="w-3/4 relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          autoplayRef={autoplay}
        >
          <CarouselContent>
            {headerTexts.map((text, index) => (
              <CarouselItem key={index}>
                <div className="bg-[#F2F0F1] h-[.5vh] flex items-center gap-20 py-44">
                  <img src={headerImages[index]} className="w-5/12" />
                  <h1 className="text-5xl w-1/2 font-bold text-primary">
                    {text}
                  </h1>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`absolute left-0 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            autoplayRef={autoplay}
          />
          <CarouselNext
            className={`absolute right-0 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            isHovered={isHovered}
            autoplayRef={autoplay}
          />
        </Carousel>
      </header>
    </main>
  );
}

export default HomePage;
