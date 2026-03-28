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

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
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
