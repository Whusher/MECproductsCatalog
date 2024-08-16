import { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { SalesServices, ProductServices } from '../../components/Endpoints';
import { useAuth } from '../../context/AuthContext';

const initialSaleForm = {
  dateSOLD: '',
  quantity: '',
  total: '',
  productID: '', // Añadimos productID aquí
};

const SaleCRUD = () => {
  const [saleForm, setSaleForm] = useState(initialSaleForm);
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]); // Añadimos el estado para los productos
  const { state } = useAuth();

  useEffect(() => {
    fetchSales();
    fetchProducts(); // Llamada para obtener productos
  }, []);

  const fetchSales = async () => {
    try {
      const response = await fetch(`${SalesServices}/getSales`);
      const data = await response.json();
  
      if (Array.isArray(data)) {
        setSales(data);
      } else {
        console.error('El formato de los datos no es el esperado:', data);
        setSales([]);
      }
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
      setSales([]);
    }
  };

  const fetchProducts = async () => {
  try {
    const response = await fetch(`${ProductServices}/getProductsByUser`,{
      method: 'POST', headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: state.userToken
      } )   
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setProducts(data);
    return data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return null;
  }
};
  

  const handleChange = (e) => {
    setSaleForm({ ...saleForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const Myproducts = await fetchProducts();
      let itineraryID; 
       Myproducts.map((product) => {
        if (product.id === saleForm.productID) itineraryID = product.itineraryID    
      } );
      console.log(itineraryID);
      const response = await fetch(`${SalesServices}/addSale`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...saleForm, itineraryID: itineraryID}),
      });
      if (response.ok) {
        const newSale = await response.json();
        setSales([...sales, newSale]);
        setSaleForm(initialSaleForm);
      }
    } catch (error) {
      console.error('Error al guardar la venta:', error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${SalesServices}/deleteSale/${sales[index].id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSales(sales.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">¿Quieres registrar una venta?</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Fecha de Venta</label>
            <input
              type="date"
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="dateSOLD"
              value={saleForm.dateSOLD}
              onChange={handleChange}
            />
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Cantidad</label>
            <input
              type="number"
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="quantity"
              value={saleForm.quantity}
              onChange={handleChange}
            />
          </div>
  
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Total</label>
            <input
              type="number"
              step="0.01"
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="total"
              value={saleForm.total}
              onChange={handleChange}
            />
          </div>
          
          {/* Campo de selección de productos */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Producto</label>
            <select
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="productID"
              value={saleForm.productID}
              onChange={handleChange}
            >
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow mt-4"
            onClick={handleSubmit}
          >
            Guardar Venta
          </button>
        </div>
      </div>
  
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Fecha de Venta</th>
            <th className="py-3 px-4 text-left">Cantidad</th>
            <th className="py-3 px-4 text-left">Total</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id || index} className="text-center border-t">
              <td className="py-3 px-4">{sale.dateSOLD}</td>
              <td className="py-3 px-4">{sale.quantity}</td>
              <td className="py-3 px-4">{sale.total}</td>
              <td className="py-3 px-4">
                <button
                  className="text-red-600 hover:text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SaleCRUD;
