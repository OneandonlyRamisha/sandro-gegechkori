import { WEBSITE_DATA } from "@/utils/data";
import style from "./schedule.module.css";
import ScheduleItem from "@/components/scheduleItem/scheduleItem";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";
import FadeUp from "@/components/animations/FadeUp";

export default async function Schedule() {
  await connectDB();

  const MONTH_ORDER: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const events = (await Event.find().lean()).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    const mA = MONTH_ORDER[a.month] ?? 0;
    const mB = MONTH_ORDER[b.month] ?? 0;
    if (mA !== mB) return mA - mB;
    return a.day - b.day;
  });

  return (
    <section className={style.section} id="schedule">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.schedule.header}</h2>
        <h3 className={style.subheader}>{WEBSITE_DATA.schedule.subheader}</h3>
      </FadeUp>

      <div className={style.scheduleList}>
        {events.length === 0 ? (
          <FadeUp delay={0.15}>
            <div className={style.empty}>
              <p className={style.emptyTitle}>
                The Announcement Of The Upcoming Events Coming Soon
              </p>
              <p className={style.emptyHint}>
                New dates will be announced soon. Check back later.
              </p>
            </div>
          </FadeUp>
        ) : (
          events.map((ev, idx) => (
            <FadeUp key={String(ev._id)} delay={idx * 0.08}>
              <ScheduleItem
                day={String(ev.day)}
                month={ev.month}
                year={String(ev.year)}
                venue={ev.venue}
                city={ev.city}
                country={ev.country ?? ""}
                piece={ev.piece ?? ""}
                ticketUrl={ev.ticketUrl ?? ""}
              />
            </FadeUp>
          ))
        )}
      </div>
    </section>
  );
}
