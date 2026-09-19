import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Villas from "@/components/Villas";
import Booking from "@/components/Booking";
import Explore from "@/components/Explore";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Villas />
        <Booking />
        <Explore />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
