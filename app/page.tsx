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

// ! hero and bio images need compress
// ! Sadnro will send you 3 images and put them first compress and than put in hero bio and contact form
// ! make it discoverable on ggoogle console
