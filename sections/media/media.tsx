import { WEBSITE_DATA } from "@/utils/data";
import style from "./media.module.css";

export default function Media() {
  return (
    <section className={style.section}>
      <h2 className="section-header">{WEBSITE_DATA.media.header}</h2>
      <h3 className="sectionSubheader">{WEBSITE_DATA.media.subheader}</h3>
    </section>
  );
}
