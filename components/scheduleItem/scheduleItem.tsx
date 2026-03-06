import style from "./scheduleItem.module.css";

export default function ScheduleItem({
  day,
  month,
  year,
  venue,
  city,
  country,
  piece,
}: {
  day: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  piece: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.dateContainer}>
        <p className={style.day}>{day}</p>
        <p className={style.monthYear}>
          {month} {year}
        </p>
      </div>

      <div className={style.infoContainer}>
        <p className={style.venue}>{venue}</p>
        <p className={style.location}>
          {city} · {country}
        </p>
        <p className={style.piece}>{piece}</p>
      </div>

      <a href="#" className={style.cta}>
        Inquire
      </a>
    </div>
  );
}
