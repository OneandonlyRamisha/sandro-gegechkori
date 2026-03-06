import { WEBSITE_DATA } from "@/utils/data";
import style from "./stages.module.css";
import StagesContainer from "@/components/stagesContainer/stagesContainer";

export default function Stages() {
  return (
    <section className={style.section} id="stages">
      <h2 className="section-header">{WEBSITE_DATA.stages.header}</h2>
      <h3 className="sectionSubheader">{WEBSITE_DATA.stages.subheader}</h3>

      <div className={style.stagesContainer}>
        {WEBSITE_DATA.stages.stages.map((i) => (
          <StagesContainer
            key={i.hall}
            name={i.hall}
            city={i.city}
            img={i.img}
            country={i.country}
          />
        ))}
      </div>
    </section>
  );
}
