import { useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import SectionMain from '../components/filters/SectionMain';
import { BarMenu } from '../utils/Icons';

function MainView() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(prev => !prev);
    console.log(isSideBarOpen);
  };

  return (
    <>
      <Header />
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
              <CardProduct/>
              <CardProduct/>
              <CardProduct/>
              <CardProduct/>
              <CardProduct/>
          </div>
        </main>
    </>
  );
}

export default MainView;