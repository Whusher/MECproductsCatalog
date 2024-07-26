import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import SellerContext from './context/SellerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthProvider>
   <SellerContext>
    <App />
   </SellerContext>
 </AuthProvider>
)
