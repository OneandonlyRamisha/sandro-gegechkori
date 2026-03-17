import { WEBSITE_DATA } from "@/utils/data";
import style from "./contact.module.css";
import { MdArrowOutward } from "react-icons/md";
import FadeUp from "@/components/animations/FadeUp";
import Image from "next/image";

export default function Contact() {
  const { contact } = WEBSITE_DATA;

  return (
    <section className={style.section} id="contact">
      <span className={style.watermark} aria-hidden="true">
        SG
      </span>

      <FadeUp className={style.top}>
        <h2 className="section-header">{contact.header}</h2>
        <h3 className="sectionSubheader">{contact.subheader}</h3>
      </FadeUp>

      <div className={style.grid}>
        <FadeUp className={style.left} delay={0.18}>
          <p className={style.des}>{contact.des}</p>

          <div className={style.agent}>
            <div className={style.logoWrap}>
              <Image
                src={contact.management.logo}
                alt={contact.management.company}
                width={180}
                height={60}
                className={style.logo}
              />
            </div>

            <span className={style.agentLabel}>{contact.management.label}</span>
            <p className={style.agentName}>{contact.management.name}</p>
            <p className={style.agentCompany}>{contact.management.company}</p>

            <div className={style.agentDetails}>
              <p>{contact.management.address}</p>
              <p>{contact.management.city}</p>
              <p>Tel: {contact.management.phone}</p>
              <p>Móvil: {contact.management.mobile}</p>
            </div>

            <a
              href={`https://${contact.management.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className={style.agentLink}
            >
              <span>{contact.management.website}</span>
              <MdArrowOutward />
            </a>

            <a
              href={`mailto:${contact.management.email}`}
              className={style.agentLink}
            >
              <span>{contact.management.email}</span>
              <MdArrowOutward />
            </a>
          </div>
        </FadeUp>

        <FadeUp className={style.right} delay={0.3}>
          <div className={style.imageWrap}>
            <Image
              src="/contact.jpg"
              alt="Sandro Gegechkori"
              fill
              className={style.artistImage}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
