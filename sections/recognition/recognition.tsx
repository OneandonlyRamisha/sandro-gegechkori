import { WEBSITE_DATA } from "@/utils/data";
import style from "./recognition.module.css";
import RecognitionContainer from "@/components/recognitionContainer/recognitionContainer";
import FadeUp from "@/components/animations/FadeUp";

export default function Recognition() {
  return (
    <section className={style.section} id="recognition">
      <FadeUp>
        <h2 className="section-header">{WEBSITE_DATA.recognition.header}</h2>
        <h3 className={style.header}>{WEBSITE_DATA.recognition.subheader}</h3>
      </FadeUp>

      <div className={style.listOfRecognitions}>
        {WEBSITE_DATA.recognition.recognitions.map((i, idx) => i && (
          <FadeUp key={i.name ?? idx} delay={idx * 0.08}>
            <RecognitionContainer
              name={i.name}
              des={i.des}
              year={i.year}
            />
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.2}>
        <div className={style.quoteContainer}>
          <p className={style.quote}>{WEBSITE_DATA.recognition.quote}</p>
          <p className={style.author}>{WEBSITE_DATA.recognition.author}</p>
        </div>
      </FadeUp>
    </section>
  );
}
