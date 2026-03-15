import { WEBSITE_DATA } from "@/utils/data";
import style from "./schedule.module.css";
import ScheduleItem from "@/components/scheduleItem/scheduleItem";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function Schedule() {
  await connectDB();
  const events = await Event.find().sort({ year: 1, day: 1 }).lean();

  return (
    <section className={style.section} id="schedule">
      <h2 className="section-header">{WEBSITE_DATA.schedule.header}</h2>
      <h3 className={style.subheader}>{WEBSITE_DATA.schedule.subheader}</h3>

      <div className={style.scheduleList}>
        {events.length === 0 ? (
          <div className={style.empty}>
            <p className={style.emptyTitle}>No Upcoming Concerts</p>
            <p className={style.emptyHint}>
              New dates will be announced soon. Check back later.
            </p>
          </div>
        ) : (
          events.map((ev) => (
            <ScheduleItem
              key={String(ev._id)}
              day={String(ev.day)}
              month={ev.month}
              year={String(ev.year)}
              venue={ev.venue}
              city={ev.city}
              country={ev.country ?? ""}
              piece={ev.piece ?? ""}
              ticketUrl={ev.ticketUrl ?? ""}
            />
          ))
        )}
      </div>
    </section>
  );
}
