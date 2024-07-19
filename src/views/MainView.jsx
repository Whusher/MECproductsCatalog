import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import SectionMain from '../components/filters/SectionMain';
import { BarMenu } from '../utils/Icons';
import { ProductServices } from '../components/Endpoints';
function MainView() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [products, setProducts] = useState([])
  const toggleSideBar = () => {
    setIsSideBarOpen(prev => !prev);
    console.log(isSideBarOpen);
  };

  useEffect(()=>{
    const getProducts = async() =>{
      try{
        const response = await 
        fetch(`${ProductServices}/getProducts/a7588cee-3b3e-11ef-9913-08bfb870b1d5`,{ 
          //We must use an user of shop selected in the context
          headers:{
            'Content-Type': 'application/json'
          },
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setProducts(data);
      }catch(e){
        console.log(e);
      }
    }
    getProducts();
  },[])

  return (
    <>
      <Header />
      {/* Perform this way to check by category do not request all */}
        <figure
          className={`fixed top-4 left-1 z-50 bg-gray-800 text-white p-2 rounded-md ${isSideBarOpen ? 'hidden': ''}`}
          onClick={toggleSideBar}
        >
          {BarMenu()}
        </figure>
        <SideBar isOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
        <main className={`flex-grow transition-transform duration-300`}>
          <SectionMain/>
          {/* Otros contenidos de la página */}
          <div className='flex flex-wrap justify-center md:justify-start md:mx-4 my-4 mx-0 p-5'>
              {
               products && products.map((producto, key) =><CardProduct key={key} data={producto}/> )
              }
          </div>
        </main>
    </>
  );
}

export default MainView;