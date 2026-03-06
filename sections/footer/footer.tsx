import { WEBSITE_DATA } from "@/utils/data";
import style from "./footer.module.css";
import { FiInstagram, FiYoutube, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.top}>
        <div className={style.brand}>
          <p className={style.name}>{WEBSITE_DATA.footer.name}</p>
          <p className={style.tagline}>{WEBSITE_DATA.footer.tagline}</p>
        </div>

        <div className={style.socials}>
          <a
            href={WEBSITE_DATA.contact.socials.instagram}
            className={style.socialLink}
          >
            <FiInstagram />
          </a>
          <a
            href={WEBSITE_DATA.contact.socials.youtube}
            className={style.socialLink}
          >
            <FiYoutube />
          </a>
          <a
            href={WEBSITE_DATA.contact.socials.facebook}
            className={style.socialLink}
          >
            <FiFacebook />
          </a>
        </div>
      </div>

      <span className={style.divider} />

      <div className={style.bottom}>
        <p className={style.copy}>
          © {new Date().getFullYear()} {WEBSITE_DATA.footer.name}. All rights
          reserved.
        </p>
        <a
          href="https://www.lukaramishvili.com"
          target="_blank"
          rel="noopener noreferrer"
          className={style.credit}
        >
          Made with love by{" "}
          <span className={style.creditName}>Luka Ramishvili</span>
        </a>
      </div>
    </footer>
  );
}
