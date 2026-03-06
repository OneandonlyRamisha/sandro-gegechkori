import style from "./songList.module.css";

export default function SongList({
  index,
  song,
  duration,
}: {
  index: string;
  song: string;
  duration: string;
}) {
  return (
    <div className={style.container}>
      <div className={style.block}>
        <p className={style.index}>{index}</p>
        <p className={style.song}>{song}</p>
      </div>
      <p className={style.duration}>{duration}</p>
    </div>
  );
}
