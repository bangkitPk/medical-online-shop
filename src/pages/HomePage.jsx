import heroImage from "@/assets/images/hero-image.png";

function HomePage() {
  return (
    <main>
      <header className="bg-[#F2F0F1] h-3/4 flex items-center relative py-44">
        <div className="h-full w-1/2">
          <img src={heroImage} className="absolute bottom-0" />
        </div>
        <h1 className="text-5xl w-1/2 font-bold text-primary">
          Belanja Mudah, Aman, dan Berkualitas untuk Kesehatan Anda
        </h1>
      </header>
    </main>
  );
}

export default HomePage;
