import { WEBSITE_DATA } from "@/utils/data";
import style from "./gallery.module.css";
import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

export default function Gallery() {
  return (
    <section className={style.section} id="gallery">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.gallery.header}</h2>
        <h3 className="sectionSubheader">{WEBSITE_DATA.gallery.subheader}</h3>
      </FadeUp>

      <div className={style.grid}>
        {WEBSITE_DATA.gallery.images.map((i, idx) => (
          <FadeUp
            key={idx}
            className={`${style.item} ${style[`item${idx + 1}`]}`}
            delay={idx * 0.08}
          >
            <Image src={i.src} alt={i.alt} fill className={style.img} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
