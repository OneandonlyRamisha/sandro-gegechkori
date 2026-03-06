import style from "./recognitionContainer.module.css";

export default function RecognitionContainer({
  year,
  name,
  des,
}: {
  year: number;
  name: string;
  des: string;
}) {
  return (
    <div className={style.container}>
      <p className={style.year}>{year}</p>
      <div className={style.contentContainer}>
        <p className={style.name}>{name}</p>
        <p className={style.des}>{des}</p>
      </div>
    </div>
  );
}
