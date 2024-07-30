import Seccions from "../helpers/SeccionsBar";
import ItemSeccion from "../helpers/ItemSeccion";
import { Engine, Car, Tacometer, ManualTransmision, Closer } from "../utils/Icons";
import { Link } from "react-router-dom";

export default function SideBar({ isOpen, toggleSideBar}) {
  const categories = [
    { name: 'Motor', icon: Engine ,items: [
      { name: 'Cabezas de motor', id: 1 },
      { name: 'Arboles de levas', id: 2 },
      { name: 'Cigueñales', id: 3 },
      { name: 'Bielas', id: 4 },
    ]},
    { name: 'Frenos y Suspension', icon: Car ,items: [
      { name: 'Discos y rotores', id: 5 },
      { name: 'Balatas nuevas', id: 6 },
      { name: 'Suspension Completa', id: 7 }
    ]},
    { name: 'Carroceria', icon: Tacometer ,items: [
      { name: 'Facias', id: 8 },
      { name: 'Salpicaderas', id: 9 },
      { name: 'Faros y calaveras', id: 10 }
    ]},
    { name: 'Otras Categorias', icon: ManualTransmision ,items: [
      { id: 11, name: "Salud y deportes", description: null },
      { id: 12, name: "Hogar y muebles", description: null },
      { id: 13, name: "Mujer y Belleza", description: null },
      { id: 14, name: "Herramienta", description: null },
      { id: 15, name: "Tecnologia y celulares", description: null },
      { id: 16, name: "Bebes y Juguetes", description: null },
      { id: 17, name: "Autos y Casas", description: null },
      { id: 18, name: "Ropa y joyeria", description: null },
      { id: 19, name: "Animales y plantas", description: null },
      { id: 20, name: "Musica y arte", description: null },
    ]}
  ];


  return (
    <aside
      className={`bg-blacks fixed inset-y-0 left-0 z-50 w-72 my-4 ml-4 rounded-3xl transicionable transform ${
        isOpen ?  'translate-x-0': '-translate-x-full bg-transparent'
      } overflow-y-scroll no-scrollbar`}
    >
        <button className="flex justify-center text-red-600 border-1 px-3 pt-2 border-red-700 " onClick={()=>toggleSideBar()}>Cerrar{Closer()}</button>
      <div className="m-4">
        <h3 className="font-semibold text-2xl tracking-wider text-white font-elegant">SECCIONES</h3>
        <ul className="mb-4 flex flex-col gap-0">
          {categories.map((category, index)=>{
            return(
              <>
                <Seccions key={index} icon={category.icon} title={category.name}/>
                {
                  category.items.map((item,index)=>{
                    return(
                      <ItemSeccion key={index} llave={index} title={item.name} link={`/${item.id}`} />
                    )
                  })
                }
              </>
            )
          })}
        </ul>
        <ul className="mb-4 flex flex-col gap-1">
          <li className="mx-3.5 mt-4 mb-2">
            <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
              Otras Acciones
            </p>
          </li>
          <li>
            <div>
              <Link
                to={'/login'}
                className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-gradient-to-tr hover:from-red-600 to-red-400 hover:shadow-lg hover:shadow-red-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-inherit"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                  Login Admin
                </p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}
