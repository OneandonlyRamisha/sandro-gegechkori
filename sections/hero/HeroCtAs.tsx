import Link from "next/link";
import { GoTriangleRight } from "react-icons/go";
import style from "./hero.module.css";

interface HeroCtAsProps {
  cta: string;
  secondaryCta: string;
}

export default function HeroCtAs({ cta, secondaryCta }: HeroCtAsProps) {
  return (
    <div className={style.ctaContainer}>
      <Link href="/schedule" className={`${style.cta} ${style.primaryCta}`}>
        {cta}
      </Link>
      <Link href="/performances" className={`${style.cta} ${style.secondaryCta}`}>
        <p>{secondaryCta}</p>
        <GoTriangleRight className={style.icon} />
      </Link>
    </div>
  );
}
