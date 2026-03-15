import Biography from "@/sections/biography/biography";
import Contact from "@/sections/contact/contact";
import Footer from "@/sections/footer/footer";
import Gallery from "@/sections/gallery/gallery";
import Hero from "@/sections/hero/hero";
import Media from "@/sections/media/media";
import Performance from "@/sections/performance/performance";
import Recognition from "@/sections/recognition/recognition";
import Schedule from "@/sections/schedule/schedule";
import Stages from "@/sections/stages/stages";
import Navigation from "@/components/navigation/navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Biography />
        <Recognition />
        <Stages />
        <Media />
        <Performance />
        <Gallery />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

// ! for schedule add no upcomignc ocnerts if there is not concerts
// Change contact and remove contact form fully just live agent detiasl
// In discography change copy
// Add logic so that sondro is able to add schedule himself
// Sandro ge
