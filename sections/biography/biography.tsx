import { WEBSITE_DATA } from "@/utils/data";
import style from "./biography.module.css";

export default function Biography() {
  return (
    <section className={style.section} id="biography">
      <h2 className="section-header">{WEBSITE_DATA.biography.header}</h2>
      <div className={style.sectionContainer}>
        <div className={style.contentContainer}>
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
        </div>
        <div className={style.imageContainer}></div>
      </div>
    </section>
  );
}
