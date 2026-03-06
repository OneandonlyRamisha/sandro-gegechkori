import { WEBSITE_DATA } from "@/utils/data";
import style from "./contact.module.css";
import { FiInstagram, FiYoutube, FiFacebook } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

export default function Contact() {
  return (
    <section className={style.section} id="contact">
      <div className={style.left}>
        <h2 className="section-header">{WEBSITE_DATA.contact.header}</h2>
        <h3 className={style.subheader}>{WEBSITE_DATA.contact.subheader}</h3>
        <p className={style.des}>{WEBSITE_DATA.contact.des}</p>

        <div className={style.management}>
          <span className={style.managementBar} />
          <div className={style.managementInfo}>
            <p className={style.managementLabel}>
              {WEBSITE_DATA.contact.management.label}
            </p>
            <p className={style.managementName}>
              {WEBSITE_DATA.contact.management.name}
            </p>
            <a
              href={`mailto:${WEBSITE_DATA.contact.management.email}`}
              className={style.managementEmail}
            >
              {WEBSITE_DATA.contact.management.email}
              <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.field}>
          <label className={style.label}>Name</label>
          <input className={style.input} type="text" />
        </div>
        <div className={style.field}>
          <label className={style.label}>Email</label>
          <input className={style.input} type="email" />
        </div>
        <div className={style.field}>
          <label className={style.label}>Organization</label>
          <input className={style.input} type="text" />
        </div>
        <div className={style.field}>
          <label className={style.label}>Message</label>
          <textarea className={`${style.input} ${style.textarea}`} />
        </div>
        <button className={style.cta}>Send Inquiry</button>
      </div>
    </section>
  );
}
