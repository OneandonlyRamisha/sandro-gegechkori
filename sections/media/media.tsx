import { WEBSITE_DATA } from "@/utils/data";
import { MdOpenInNew, MdArrowOutward } from "react-icons/md";
import style from "./media.module.css";
import SongList from "@/components/songList/songList";
import Image from "next/image";
import FadeUp from "@/components/animations/FadeUp";

export default function Media() {
  return (
    <section className={style.section} id="discography">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.media.header}</h2>
        <h3 className="sectionSubheader">{WEBSITE_DATA.media.subheader}</h3>
        <p className={style.des}>{WEBSITE_DATA.media.des}</p>
      </FadeUp>

      <div className={style.discContainer}>
        <FadeUp className={style.imgCOntainer} delay={0.15}>
          <div className={style.img}>
            <Image src="/album.jpg" alt="picture of sandro's album" fill />
          </div>
          <div className={style.discImageHeaderCOntainer}>
            <span className={style.line}></span>
            <p className={style.discHeader}>{WEBSITE_DATA.media.disHeader}</p>
            <span className={style.line}></span>
          </div>
        </FadeUp>

        <FadeUp className={style.songContainer} delay={0.3}>
          <p className={style.songSubheader}>
            {WEBSITE_DATA.media.discContent.subheader}
          </p>
          <p className={style.songHeader}>
            {WEBSITE_DATA.media.discContent.header}
          </p>
          <p className={style.songHighlight}>
            {WEBSITE_DATA.media.discContent.highlight}
          </p>
          <p className={style.sonDes}>{WEBSITE_DATA.media.discContent.des}</p>

          <div className={style.songsList}>
            {WEBSITE_DATA.media.discContent.music.map((i) => (
              <SongList
                key={i.index}
                song={i.music}
                index={i.index}
                duration={i.time}
              />
            ))}
          </div>

          <div className={style.ctaContainer}>
            <a
              href="https://open.spotify.com/album/0PCb6WBWeAXKxKK6dxz3rm"
              target="_blank"
              className={style.mainCtaContainer}
            >
              <p className={style.mainCta}>
                {WEBSITE_DATA.media.discContent.mainCta}
              </p>
              <MdOpenInNew className={style.icon} />
            </a>
            {WEBSITE_DATA.media.discContent.ctas.map((i) => (
              <a
                href={i.link}
                key={i.name}
                target="_blank"
                className={style.secondaryCtaContainer}
              >
                <p className={style.secondaryCta}>{i.name}</p>
                <MdArrowOutward className={style.icon} />
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
