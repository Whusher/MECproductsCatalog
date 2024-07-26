import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import SectionMain from '../components/filters/SectionMain';
import { BarMenu } from '../utils/Icons';
import { ProductServices } from '../components/Endpoints';
import { useParams } from 'react-router-dom';

function MainView() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const categoryId = useParams(); // Obtener categoryId de la URL

  const toggleSideBar = () => {
    setIsSideBarOpen(prev => !prev);
    console.log(isSideBarOpen);
  };

  const getProducts = async () => {
    console.log(categoryId.category)
    try {
      const response = await fetch(`${ProductServices}/getProducts/${categoryId.category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: "a7588cee-3b3e-11ef-9913-08bfb870b1d5"
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    console.log(categoryId);
    // Solo llamar a getProducts si categoryId está disponible
    if (categoryId) {
      getProducts();
    }
  }, [categoryId]); // Ejecutar efecto cuando categoryId cambie

  return (
    <>
      <Header />
      <figure
        className={`fixed top-4 left-1 z-50 bg-gray-800 text-white p-2 rounded-md ${isSideBarOpen ? 'hidden' : ''}`}
        onClick={toggleSideBar}
      >
        {BarMenu()}
      </figure>
      <SideBar isOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
      <main className={`flex-grow transition-transform duration-300`}>
        <SectionMain />
        <div className='flex flex-wrap justify-center md:justify-start md:mx-4 my-4 mx-0 p-5'>
          {Array.isArray(products) && products.map((producto, key) => (
            <CardProduct key={key} data={producto} />
          ))}
        </div>
      </main>
    </>
  );
}

export default MainView;
