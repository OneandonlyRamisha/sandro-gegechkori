import Image from "next/image";
import style from "./stagesContainer.module.css";

export default function StagesContainer({
  img,
  name,
  city,
  country,
}: {
  img: string;
  name: string;
  city: string;
  country: string;
}) {
  return (
    <div className={style.container}>
      <Image
        alt="image of the hall"
        src={img}
        width={100}
        height={100}
        className={style.img}
      />
      <div className={style.contentContainer}>
        <p className={style.hall}>{name}</p>
        <p className={style.city}>{city}</p>
        <p className={style.country}>{country}</p>
      </div>
    </div>
  );
}
