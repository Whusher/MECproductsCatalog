import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainView from './views/MainView';
import ProductSpec from './views/products/ProductSpec';
import Login from './views/auth/Login';
// import ProducCrud from './views/auth/ProductCrud';
//import CrudLayout from './views/admin/CrudLayout';
import UploadImage from './views/UploadImage';
import NewProduct from './views/admin/NewProduct';
import NewSeller from './views/admin/NewSeller';
import WelcomeUser from './views/admin/WelcomeUser'
import NewSale from './views/admin/NewSale';
import { useAuth } from './context/AuthContext';
function App(){
  const {state} = useAuth();
  return(
  <Router basename='/catalogo'>
    <Routes>
        <Route path="/" element={<MainView />} />
        <Route path=":category" element={<MainView />} />
        {/* <Route path='/' element={<MainView/>} />
        <Route path='/catalogo/:category' element={<MainView/>} /> */}
        {/* Manejo del ruteo dinamico de los productos :id */}
        <Route path='/product/:id' element={<ProductSpec/>} />
        <Route path='/login' element={<Login/>}/>
        {state.rol == 'seller' || state.rol == 'admin'?
        (<>
          <Route path='/crud' element={<UploadImage/>}/>
          <Route path='/welcome' element={<WelcomeUser/>}/>
          <Route path='/products' element={<NewProduct/>}/>
          <Route path='/sellers' element={<NewSeller/>}/>
          <Route path='/sales' element={<NewSale/>}/>           
        </>)
        :(<>
          
        </>) }
    </Routes>
  </Router>
  )
}


export default App;
