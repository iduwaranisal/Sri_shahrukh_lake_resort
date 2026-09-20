import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Villas from "@/components/Villas";
import Explore from "@/components/Explore";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import { getSiteContent } from "@/app/actions/contentActions";
import { optimizeImage } from "@/lib/imageOptimization";

export const revalidate = 60;

export default async function Home() {
  const content = await getSiteContent();
  const firstHeroImage = content.heroImages?.[0]?.src
    ? optimizeImage(content.heroImages[0].src, {
        width: 1920,
        quality: "auto",
        format: "auto",
      })
    : null;

  return (
    <>
      {firstHeroImage && (
        <link
          rel="preload"
          as="image"
          href={firstHeroImage}
          fetchPriority="high"
        />
      )}
      <Navbar />
      <main id="main-content">
        <Hero
          heroTitle={content.heroTitle}
          heroSubtitle={content.heroSubtitle}
          whatsapp={content.whatsapp}
          slides={content.heroImages}
        />
        <About
          aboutStory={content.aboutStory}
          ratingScore={content.ratingScore}
          ratingLabel={content.ratingLabel}
          founderImage={content.aboutImage}
        />
        <Villas
          homestayTitle={content.homestayTitle}
          homestayDescription={content.homestayDescription}
          amenities={content.amenities}
          homestayImages={content.homestayImages}
        />
        <Explore customImages={content.exploreImages} />
        <Gallery initialImages={content.galleryImages} />
        <Reviews
          initialReviews={content.reviews}
          ratingScore={content.ratingScore}
          ratingLabel={content.ratingLabel}
        />
        <Contact
          phone={content.phone}
          whatsapp={content.whatsapp}
          email={content.email}
          address={content.address}
          mapUrl={content.mapUrl}
        />
        <MapSection address={content.address} mapUrl={content.mapUrl} />
      </main>
      <Footer
        phone={content.phone}
        whatsapp={content.whatsapp}
        email={content.email}
        address={content.address}
        mapUrl={content.mapUrl}
        ratingScore={content.ratingScore}
      />
      <MobileBottomBar />
    </>
  );
}

