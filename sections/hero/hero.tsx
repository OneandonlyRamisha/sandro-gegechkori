import Link from "next/link";
import style from "./hero.module.css";
import { GoTriangleRight } from "react-icons/go";
import { WEBSITE_DATA } from "@/utils/data";

export default function Hero() {
  return (
    <section className={style.section}>
      <div className={style.line}></div>
      <h6 className={style.occupation}>
        {WEBSITE_DATA.heroSection.occupation}
      </h6>

      <h1 className={style.header}>{WEBSITE_DATA.heroSection.header}</h1>

      <div className={style.longerLine}></div>

      <p className={style.quote}>{WEBSITE_DATA.heroSection.quote}</p>

      <div className={style.ctaContainer}>
        <Link href={"#"} className={`${style.cta} ${style.primaryCta}`}>
          {WEBSITE_DATA.heroSection.cta}
        </Link>
        <Link href={"#"} className={`${style.cta} ${style.secondaryCta}`}>
          <p> {WEBSITE_DATA.heroSection.secondaryCta}</p>
          {<GoTriangleRight className={style.icon} />}
        </Link>
      </div>
    </section>
  );
}
