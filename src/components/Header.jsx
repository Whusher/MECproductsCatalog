import { useBrands } from "../context/SellerContext";

export default function Header() {
  const { state, changeBrand } = useBrands();
  const { availableBrands, currentBrand } = state;

  const handleChange = (event) => {
    const selectedBrand = availableBrands.find(
      (brand) => brand.id === event.target.value
    );
    changeBrand(selectedBrand);
  };

  return (
    <header className="flex justify-center items-center w-full h-[100px] text-center bg-gradient-to-l from-blacks via-blacks md:to-transparent to-contrast">
      <h1 className="font-bold text-white text-2xl md:text-4xl">Autopartes Querétaro</h1>
      <div className="ml-36 text-white">
        <label htmlFor="tienda">Comprando en: </label>
        <select
          id="tienda"
          name="tienda"
          value={currentBrand?.id || ''}
          onChange={handleChange}
        >
          <option value="">Selecciona una tienda</option>
          {Array.isArray(availableBrands) && availableBrands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.enterpriseName}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
