import Biography from "@/sections/biography/biography";
import Hero from "@/sections/hero/hero";
import Media from "@/sections/media/media";
import Recognition from "@/sections/recognition/recognition";
import Stages from "@/sections/stages/stages";

export default function Home() {
  return (
    <main>
      <Hero />
      <Biography />
      <Recognition />
      <Stages />
      <Media />
    </main>
  );
}
