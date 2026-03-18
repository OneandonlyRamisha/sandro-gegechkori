"use client";

import { GoTriangleRight } from "react-icons/go";
import style from "./hero.module.css";

interface HeroCtAsProps {
  cta: string;
  secondaryCta: string;
}

export default function HeroCtAs({ cta, secondaryCta }: HeroCtAsProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={style.ctaContainer}>
      <button
        onClick={() => scrollTo("schedule")}
        className={`${style.cta} ${style.primaryCta}`}
      >
        {cta}
      </button>
      <button
        onClick={() => scrollTo("performances")}
        className={`${style.cta} ${style.secondaryCta}`}
      >
        <p>{secondaryCta}</p>
        <GoTriangleRight className={style.icon} />
      </button>
    </div>
  );
}
