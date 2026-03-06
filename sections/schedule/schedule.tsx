import { WEBSITE_DATA } from "@/utils/data";
import style from "./schedule.module.css";
import ScheduleItem from "@/components/scheduleItem/scheduleItem";

export default function Schedule() {
  return (
    <section className={style.section} id="schedule">
      <h2 className="section-header">{WEBSITE_DATA.schedule.header}</h2>
      <h3 className={style.subheader}>{WEBSITE_DATA.schedule.subheader}</h3>

      <div className={style.scheduleList}>
        {WEBSITE_DATA.schedule.events.map((i) => (
          <ScheduleItem
            key={i.venue}
            day={i.day}
            month={i.month}
            year={i.year}
            venue={i.venue}
            city={i.city}
            country={i.country}
            piece={i.piece}
          />
        ))}
      </div>
    </section>
  );
}
