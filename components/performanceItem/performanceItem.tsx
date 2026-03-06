import style from "./performanceItem.module.css";

export default function PerformanceItem({
  venue,
  city,
  year,
  piece,
  ctaLabel,
  ctaLink,
}: {
  venue: string;
  city: string;
  year: string;
  piece: string;
  ctaLabel: string;
  ctaLink: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.left}>
        <p className={style.venue}>{venue}</p>
        <div className={style.meta}>
          <span className={style.location}>
            {city} · {year}
          </span>
          <span className={style.divider}>|</span>
          <span className={style.piece}>{piece}</span>
        </div>
      </div>

      <a href={ctaLink} className={style.cta}>
        <span className={style.ctaLabel}>{ctaLabel}</span>
        <span className={style.ctaIcon}>+</span>
      </a>
    </div>
  );
}
