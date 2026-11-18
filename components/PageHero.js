import Photo from './Photo';
export default function PageHero({ title, text, img }) {
  return (
    <div className="phero">
      <Photo src={img} className="phero-bg" priority />
      <div className="w phero-in"><h1>{title}</h1><p>{text}</p></div>
    </div>
  );
}
