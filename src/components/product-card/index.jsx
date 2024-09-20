import { Button } from "../ui/button";
import heroImage from "@/assets/images/hero-image.png";

export default function ProductCard() {
  return (
    <div className="w-full max-w-52">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:bg-gray-950">
        <img
          src={heroImage}
          alt="Product Image"
          // width={600}
          // height={400}
          className="w-full object-cover aspect-square"
        />
        <div className="p-2">
          <h3 className="font-semibold">Product Title</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Toko Medis Jaya Sehat
          </p>
          <span className="font-bold">Rp550.000</span>
          <div className="flex flex-col items-center justify-between gap-2 mt-2">
            <Button className="w-full" variant="secondary">
              Lihat
            </Button>
            <Button className="w-full" variant="outline">
              Beli
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
