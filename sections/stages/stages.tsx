import { WEBSITE_DATA } from "@/utils/data";
import style from "./stages.module.css";
import StagesContainer from "@/components/stagesContainer/stagesContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function Stages() {
  return (
    <section className={style.section} id="stages">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.stages.header}</h2>
        <h3 className="sectionSubheader">{WEBSITE_DATA.stages.subheader}</h3>
      </FadeUp>

      <div className={style.stagesContainer}>
        {WEBSITE_DATA.stages.stages.map((i, idx) => (
          <FadeUp key={i.hall} delay={idx * 0.07}>
            <StagesContainer
              name={i.hall}
              city={i.city}
              img={i.img}
              country={i.country}
            />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
