import { Trash } from "../../utils/Icons";

export default function SectionMain() {
  return (
    <section className="flex flex-row items-center px-4 overflow-y-scroll no-scrollbar">
      <h3 className="font-bold font-elegant mx-8 text-xl">Filtros</h3>
      <div className="flex flex-grow ml-6 items-center" id="filters">
        <div id="filter1" className=" basis-1/4 ">
          <label htmlFor="marca">Marca: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="marca"
          >
            <option>Chevrolet</option>
            <option>Ford</option>
            <option>Mazda</option>
          </select>
        </div>
        <div id="filter2" className="basis-1/4">
          <label htmlFor="model">Modelo: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="model"
          >
            <option>Chevrolet</option>
            <option>Ford</option>
            <option>Mazda</option>
          </select>
        </div>
        <div id="filter3" className=" basis-1/4">
          <label htmlFor="anio">Año: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="anio"
          >
            <option>2020</option>
            <option>2019</option>
            <option>2018</option>
          </select>
        </div>
        <div id="filter4" className=" basis-1/4">
          <label htmlFor="motor">Motor: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="motor"
          >
            <option>1.0L</option>
            <option>1.8L</option>
            <option>2.0L</option>
          </select>
        </div>
        <div id="clear-filters" className="basis-1/4">
            <button className="text-red-500 flex justify-center space-x-1">
                <span className="mx-3">Borrar filtros</span> {Trash()}
            </button>
        </div>
      </div>
    </section>
  );
}
