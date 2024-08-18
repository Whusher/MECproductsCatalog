import { useState } from "react";
import { Trash } from "../../utils/Icons";

const marcas = [
  "Chevrolet",
  "Ford",
  "Kia",
  "Volkswagen",
  "Nissan",
  "Toyota",
  "Honda",
  "Mazda",
  "Hyundai",
  "Renault",
  "Fiat",
];

const modelos = [
  "Civic",
  "Accord",
  "Corolla",
  "Camry",
  "Jetta",
  "Golf",
  "Focus",
  "Fiesta",
  "Sentra",
  "Altima",
];

const anios = Array.from({ length: 2024 - 1990 + 1 }, (_, i) => 1990 + i);

const motores = [
  "1.0L",
  "1.2L",
  "1.4L",
  "1.6L",
  "1.8L",
  "2.0L",
  "2.2L",
  "2.4L",
  "2.6L",
  "2.8L",
  "3.0L",
  "3.2L",
  "3.4L",
  "3.6L",
  "4.0L",
  "4.2L",
  "4.4L",
  "5.0L",
  "5.2L",
  "6.0L",
  "6.2L",
  "7.0L",
];

export default function SectionMain({ onFilterChange }) {
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    anio: '',
    motor: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
    onFilterChange({ ...filters, [id]: value });
  };

  return (
    <section className="flex flex-row items-center px-4 overflow-y-scroll no-scrollbar">
      <h3 className="font-bold font-elegant mx-8 text-xl">Filtros</h3>
      <div className="flex flex-grow ml-6 items-center" id="filters">
        <div id="filter1" className="basis-1/4">
          <label htmlFor="brand">Marca: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="brand"
            value={filters.brand}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            {marcas.map((marca, index) => (
              <option value={marca} key={index}>
                {marca}
              </option>
            ))}
          </select>
        </div>

        <div id="filter2" className="basis-1/4">
          <label htmlFor="model">Modelo: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="model"
            value={filters.model}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {modelos.map((modelo, index) => (
              <option value={modelo} key={index}>
                {modelo}
              </option>
            ))}
          </select>
        </div>

        <div id="filter3" className="basis-1/4">
          <label htmlFor="anio">Año: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="anio"
            value={filters.anio}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {anios.map((anio, index) => (
              <option value={anio} key={index}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        <div id="filter4" className="basis-1/4">
          <label htmlFor="motor">Motor: </label>
          <select
            className="rounded-xl px-4 py-1 my-4 bg-prices text-white"
            id="motor"
            value={filters.motor}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            {motores.map((motor, index) => (
              <option value={motor} key={index}>
                {motor}
              </option>
            ))}
          </select>
        </div>

        <div id="clear-filters" className="basis-1/4">
          <button className="text-red-500 flex justify-center space-x-1" onClick={() => onFilterChange({})}>
            <span className="mx-3">Borrar filtros</span> {Trash()}
          </button>
        </div>
      </div>
    </section>
  );
}
