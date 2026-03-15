import style from "./scheduleItem.module.css";

export default function ScheduleItem({
  day,
  month,
  year,
  venue,
  city,
  country,
  piece,
  ticketUrl,
}: {
  day: string;
  month: string;
  year: string;
  venue: string;
  city: string;
  country: string;
  piece: string;
  ticketUrl?: string;
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

      <a
        href={ticketUrl || "#"}
        target={ticketUrl ? "_blank" : undefined}
        rel={ticketUrl ? "noopener noreferrer" : undefined}
        className={style.cta}
      >
        {ticketUrl ? "Get Tickets" : "Inquire"}
      </a>
    </div>
  );
}
