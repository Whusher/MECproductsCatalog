import { Link } from "react-router-dom";
export default function ItemSeccion({link, title, llave}) {
  return (
    <li key={llave}>
      <Link aria-current="page" className="active" to={link}> {/*Aqui debe de ir un Link*/}
        <button
          className="middle none  font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg  text-white 
                    hover:bg-gradient-to-tr hover:from-contrast to-blacks
                  hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-2 px-4 capitalize text-elegant"
          type="button"
        >
          <p className="block antialiased text-base leading-relaxed text-inherit font-medium capitalize">
           {title}
          </p>
        </button>
      </Link>
    </li>
  );
}
