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
import Footer from "@/components/footer";

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
      <header className="w-full max-sm:block flex justify-center">
        <Carousel
          plugins={[autoplay.current]}
          className="max-sm:w-full w-3/4 relative cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          autoplayref={autoplay}
        >
          <CarouselContent>
            {headerTexts.map((text, index) => (
              <CarouselItem key={index}>
                <div className="bg-[#F2F0F1] h-[.5vh] flex items-center max-sm:gap-10 gap-20 py-44">
                  <img src={headerImages[index]} className="w-5/12" />
                  <h1 className="max-sm:text-2xl text-5xl w-1/2 font-bold text-primary">
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
      <section className="w-full flex justify-center my-24">
        <div className="w-3/4">
          <h2 className="text-primary font-bold text-3xl mb-5">Tentang Kami</h2>
          <p>
            <span className="text-primary font-bold texlg">MedCareShop</span>{" "}
            adalah platform belanja online yang menyediakan berbagai alat
            kesehatan berkualitas untuk memenuhi kebutuhan medis Anda, baik
            untuk penggunaan pribadi maupun profesional. Kami berkomitmen untuk
            menyediakan produk-produk terpercaya dan terbaru, mulai dari
            peralatan diagnostik, perlengkapan medis, hingga kebutuhan
            sehari-hari untuk perawatan kesehatan di rumah. Dengan layanan yang
            mudah, aman, dan cepat, kami hadir untuk membantu Anda menjaga
            kesehatan dengan produk yang terjamin keasliannya dan harga yang
            bersaing. MedCareShop, solusi belanja alat kesehatan yang dapat
            diandalkan, kapan saja dan di mana saja.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
