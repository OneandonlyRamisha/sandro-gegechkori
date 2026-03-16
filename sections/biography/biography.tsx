import { WEBSITE_DATA } from "@/utils/data";
import style from "./biography.module.css";
import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

export default function Biography() {
  return (
    <section className={style.section} id="biography">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.biography.header}</h2>
      </FadeUp>

      <div className={style.sectionContainer}>
        <FadeUp className={style.contentContainer} delay={0.15}>
          <h3 className={style.contentHeader}>
            {WEBSITE_DATA.biography.contentHeader}
          </h3>
          <div className={style.paragraphContainer}>
            {WEBSITE_DATA.biography.bio.map((i) => (
              <p key={i} className={style.paragraph}>
                {i}
              </p>
            ))}
          </div>
          <ul className={style.highlightList}>
            {WEBSITE_DATA.biography.highlights.map((i) => (
              <li key={i} className={style.highlightListItem}>
                {i}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp className={style.imageContainer} delay={0.3}>
          <Image
            className={style.img}
            alt="Image of sandro sitting and looking at camera"
            src={"/about.jpg"}
            fill
          />
        </FadeUp>
      </div>
    </section>
  );
}
