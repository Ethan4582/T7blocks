import { Hero } from "@/components/landing/Hero";
import { CardGallery } from "@/components/landing/CardGallery";
import { PlayReel } from "@/components/landing/PlayReel";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <CardGallery />
      <PlayReel />
      <Footer />
    </div>
  );
}
