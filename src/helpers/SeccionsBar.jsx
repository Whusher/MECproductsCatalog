


export default function Seccions({
  title = "Section Title",
  icon,
  link = "/",
  llave
}) {
  return (
    <li className="py-3 text-md font-elegant text-contrast text-center px-3" key={llave}>
      <a href={link} className="flex items-center justify-between">
        <span className="">
          ---- {title} ---- 
        </span>
        {icon()}
      </a>
    </li>
  );
}
