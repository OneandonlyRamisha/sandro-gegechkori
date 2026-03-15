import { WEBSITE_DATA } from "@/utils/data";
import style from "./performance.module.css";
import PerformanceItem from "@/components/performanceItem/performanceItem";

export default function Performance() {
  return (
    <section className={style.section} id="performance">
      <h2 className="section-header">{WEBSITE_DATA.performance.header}</h2>
      <h3 className="sectionSubheader">{WEBSITE_DATA.performance.subheader}</h3>

      <div className={style.performanceList}>
        {WEBSITE_DATA.performance.performances.map((i) => (
          <PerformanceItem
            key={i.venue}
            venue={i.venue}
            city={i.city}
            year={i.year}
            piece={i.piece}
            ctaLabel={i.ctaLabel}
            ctaLink={i.ctaLink}
          />
        ))}
      </div>
    </section>
  );
}
