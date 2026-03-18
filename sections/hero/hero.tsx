import Link from "next/link";
import style from "./hero.module.css";
import { GoTriangleRight } from "react-icons/go";
import { WEBSITE_DATA } from "@/utils/data";
import FadeUp from "@/components/animations/FadeUp";

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
        <div className={style.ctaContainer}>
          <Link
            href={"#schedule"}
            className={`${style.cta} ${style.primaryCta}`}
          >
            {WEBSITE_DATA.heroSection.cta}
          </Link>
          <Link
            href={"#performances"}
            className={`${style.cta} ${style.secondaryCta}`}
          >
            <p>{WEBSITE_DATA.heroSection.secondaryCta}</p>
            {<GoTriangleRight className={style.icon} />}
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
