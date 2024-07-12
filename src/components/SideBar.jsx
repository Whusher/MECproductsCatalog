import Seccions from "../helpers/SeccionsBar";
import ItemSeccion from "../helpers/ItemSeccion";
import { Engine, Car, Tacometer, ManualTransmision, Closer } from "../utils/Icons";
import { Link } from "react-router-dom";

export default function SideBar({ isOpen, toggleSideBar }) {
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
          <Seccions link="/" icon={Engine} title="MOTOR" />
          <ItemSeccion title={'Cabezas de motor'} link={'/'} />
          <ItemSeccion title={'arboles de levas'} link={'/'} />
          <ItemSeccion title={'Alternadores'} link={'/'} />
          <ItemSeccion title={'Cigueñales'} link={'/'} />
          <ItemSeccion title={'Volantes de motor'} link={'/'} />
          <Seccions link="/" icon={Car} title="CARROCERIA" />
          <ItemSeccion title={'Amortiguadores'} link={'/'} />
          <ItemSeccion title={'Suspension completa'} link={'/'} />
          <ItemSeccion title={'Flechas'} link={'/'} />
          <ItemSeccion title={'Horquillas'} link={'/'} />
          <Seccions link="/" icon={Tacometer} title="FRENOS" />
          <ItemSeccion title={'Tambores'} link={'/'} />
          <ItemSeccion title={'Rotores'} link={'/'} />
          <ItemSeccion title={'Bombas de Freno'} link={'/'} />
          <Seccions link="/" icon={ManualTransmision} title="EXTRA" />
          <ItemSeccion title={'Rines'} link={'/'} />
          <ItemSeccion title={'Transmisiones'} link={'/'} />
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
