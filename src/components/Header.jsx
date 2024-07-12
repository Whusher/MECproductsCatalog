export default function Header() {
    return (
      <header className="flex justify-center items-center w-full h-[100px] text-center bg-gradient-to-l from-blacks via-blacks md:to-transparent to-contrast">
        <h1 className="font-bold text-white text-2xl md:text-4xl">Autopartes Querétaro</h1>
        <div className="ml-36 text-white">
        <label htmlFor="tienda">Comprando en: </label>
        <select id="tienda" name="tienda">
            <option>Mecanico Express</option>
            <option>Yonke Hermanos</option>
        </select>
        </div>
      </header>
    );
  }
  