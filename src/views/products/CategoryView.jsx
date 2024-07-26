import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CardProduct from '../components/CardProduct';
import { ProductServices } from '../components/Endpoints';
import { useAuth } from '../context/AuthContext';

function CategoryView() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const { state } = useAuth(); // Suponiendo que tienes un contexto de autenticación para obtener el usuario

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`${ProductServices}/getProducts/${encodeURIComponent(categoryName)}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ user: state.userToken }) // Incluye el usuario en el cuerpo de la solicitud
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <div className='flex flex-wrap justify-center md:justify-start md:mx-4 my-4 mx-0 p-5'>
      {products && products.map((product, key) => (
        <CardProduct key={key} data={product} />
      ))}
    </div>
  );
}

export default CategoryView;
