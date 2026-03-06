import { WEBSITE_DATA } from "@/utils/data";
import style from "./recognition.module.css";
import RecognitionContainer from "@/components/recognitionContainer/recognitionContainer";

export default function Recognition() {
  return (
    <section className={style.section}>
      <h2 className="section-header">{WEBSITE_DATA.recognition.header}</h2>
      <h3 className={style.header}>{WEBSITE_DATA.recognition.subheader}</h3>
      <div className={style.listOfRecognitions}>
        {WEBSITE_DATA.recognition.recognitions.map((i) => (
          <RecognitionContainer
            key={i.name}
            name={i.name}
            des={i.des}
            year={i.year}
          />
        ))}
      </div>
      <div className={style.quoteContainer}>
        <p className={style.quote}>{WEBSITE_DATA.recognition.quote}</p>
        <p className={style.author}>{WEBSITE_DATA.recognition.author}</p>
      </div>
    </section>
  );
}
