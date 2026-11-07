import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PartsSection } from "@/components/sections/PartsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { getStructuredData, serializeStructuredData } from "@/lib/structured-data";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
export { metadata } from "@/lib/metadata";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(getStructuredData()) }}
      />
      <Header />
      <SmoothScroll />
      <main id="conteudo">
        <HeroSection />
        <BrandsSection />
        <AboutSection />
        <WhyChooseUs />
        <ServicesSection />
        <PartsSection />
        <ContactSection />
        <TestimonialsSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
