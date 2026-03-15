import { WEBSITE_DATA } from "@/utils/data";
import style from "./contact.module.css";
import { MdArrowOutward } from "react-icons/md";

export default function Contact() {
  const { contact } = WEBSITE_DATA;

  return (
    <section className={style.section} id="contact">
      <span className={style.watermark} aria-hidden="true">
        SG
      </span>

      <div className={style.top}>
        <h2 className="section-header">{contact.header}</h2>
        <h3 className="sectionSubheader">{contact.subheader}</h3>
      </div>

      <div className={style.bottom}>
        <p className={style.des}>{contact.des}</p>

        <div className={style.agent}>
          <span className={style.agentLabel}>{contact.management.label}</span>
          <p className={style.agentName}>{contact.management.name}</p>
          <a
            href={`mailto:${contact.management.email}`}
            className={style.agentEmail}
          >
            <span>{contact.management.email}</span>
            <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
}
