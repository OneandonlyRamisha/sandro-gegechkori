import { WEBSITE_DATA } from "@/utils/data";
import style from "./gallery.module.css";
import FadeUp from "@/components/animations/FadeUp";
import GalleryClient from "@/components/galleryClient/GalleryClient";

export default function Gallery() {
  return (
    <section className={style.section} id="gallery">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.gallery.header}</h2>
        <h3 className="sectionSubheader">{WEBSITE_DATA.gallery.subheader}</h3>
      </FadeUp>

      <GalleryClient images={WEBSITE_DATA.gallery.images} />
    </section>
  );
}
