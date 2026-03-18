import style from "./hero.module.css";
import { WEBSITE_DATA } from "@/utils/data";
import FadeUp from "@/components/animations/FadeUp";
import HeroCtAs from "./HeroCtAs";

export default function Hero() {
  return (
    <section className={style.section}>
      <FadeUp triggerOnLoad delay={0.05}>
        <div className={style.line}></div>
      </FadeUp>

      <FadeUp triggerOnLoad delay={0.15}>
        <h6 className={style.occupation}>
          {WEBSITE_DATA.heroSection.occupation}
        </h6>
      </FadeUp>

      <FadeUp triggerOnLoad delay={0.3}>
        <h1 className={style.header}>{WEBSITE_DATA.heroSection.header}</h1>
      </FadeUp>

      <FadeUp triggerOnLoad delay={0.45}>
        <div className={style.longerLine}></div>
      </FadeUp>

      <FadeUp triggerOnLoad delay={0.55}>
        <p className={style.quote}>{WEBSITE_DATA.heroSection.quote}</p>
      </FadeUp>

      <FadeUp triggerOnLoad delay={0.7}>
        <HeroCtAs
          cta={WEBSITE_DATA.heroSection.cta}
          secondaryCta={WEBSITE_DATA.heroSection.secondaryCta}
        />
      </FadeUp>
    </section>
  );
}
