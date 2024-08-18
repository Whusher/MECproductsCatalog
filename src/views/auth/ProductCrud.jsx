import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { subirImagen,borrarImagen, borrarImagenPorUrl } from "../../helpers/firebase/Config";
import { useAuth } from "../../context/AuthContext";
import { ProductServices } from "../../components/Endpoints";

const CATEGORIES =[
    { name: 'Cabezas de motor', id: 1 },
    { name: 'Arboles de levas', id: 2 },
    { name: 'Cigueñales', id: 3 },
    { name: 'Bielas', id: 4 },
    { name: 'Discos y rotores', id: 5 },
    { name: 'Balatas nuevas', id: 6 },
    { name: 'Suspension Completa', id: 7 },
    { name: 'Facias', id: 8 },
    { name: 'Salpicaderas', id: 9 },
    { name: 'Faros y calaveras', id: 10 },
    { id: 11, name: "Salud y deportes", description: null },
    { id: 12, name: "Hogar y muebles", description: null },
    { id: 13, name: "Mujer y Belleza", description: null },
    { id: 14, name: "Herramienta", description: null },
    { id: 15, name: "Tecnologia y celulares", description: null },
    { id: 16, name: "Bebes y Juguetes", description: null },
    { id: 17, name: "Autos y Casas", description: null },
    { id: 18, name: "Ropa y joyeria", description: null },
    { id: 19, name: "Animales y plantas", description: null },
    { id: 20, name: "Musica y arte", description: null },
    {id: 21, name: "Otros", description: null}
];

function ProductCRUD() {
  //Product object initial state
  const initializeForm = () =>{
    return {
      productName: "",
      productPrice: "",
      productDesc: "",
      user: state.userToken,
      image1: null,
      image2: null,
      image3: null,
      offert: false,
      anioCompatibilityIni: 0,
      anioCompatibilityFin: 0,
      category: null,
      brand: 0,
      stock: 0,
      motorCompatibility: '',
      modelCompatibility: '',
      facebookUri: "",
      whatsappUri: state.whatsapp, //Get from context provider
    };
  }
  //Context get
  const {state} = useAuth();

  //Real necessary states
  const [productForm, setProductForm] = useState(initializeForm());
  const [showForm, setShowForm] = useState(false);
  const [currentProducts,setCurrentProducts] = useState([]);
  const [deleteReference, setDeleteReference] = useState({
    image1:'',
    image2: '',
    image3: ''
  })
  const [previewUrls, setPreviewUrls] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const handlePresubmit = async() => {
    try{
      const response = await fetch(`${ProductServices}/addProduct`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
        alert('Producto Agregado Correctamente');
        window.location.reload();
      }else{
        console.log('Something went wrong');
      }
    }catch(e){
      console.log(e)
    }finally{
      console.log('Request finished')
    }
  };

  const handleImageChange = async(e) => {
    const { name, files } = e.target;
    const IMAGENAME = `${files[0].name+Date.now()}`;
    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrls((prevUrls) => ({ ...prevUrls, [name]: reader.result }));
    };
    reader.readAsDataURL(files[0]);
    //TRY STORE AN IMAGE IN OUR DB
    try{
      const URL = await subirImagen(files[0],{idUser: 'fagf'},IMAGENAME)
      if(URL){
        //Store our URL of an image added
        setProductForm({...productForm, 
          [name]: URL
        });
        //Store a Delete Reference of the image to drop in firebase
        setDeleteReference({...deleteReference, [name]: IMAGENAME});
      }else{
        console.log('something went wrong');
      }
    }catch(e){
      console.log(e)
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };


  const handleDeleteProduct = async(id,mainImageURL) => {
    console.log(mainImageURL)
    console.log(id)
    //First get all the images 
    try{
      let response = await fetch(`${ProductServices}/individualProduct/${id}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(response.ok){
        const individualProduct = await response.json();
        console.log(individualProduct);
        //mandar la eliminacion del producto en la BD
        const res = await fetch(`${ProductServices}/dropProduct`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id})
        })
        if(res.ok){
          alert('Producto Eliminado Correctamente');
          window.location.reload();
        }
        //Comenzar eliminacion de imagenes de fireBASE
        if(mainImageURL)
          console.log(await borrarImagenPorUrl(mainImageURL));
          if(individualProduct.second)
          console.log(await borrarImagenPorUrl(individualProduct.second));
          if(individualProduct.third)
          console.log(await borrarImagenPorUrl(individualProduct.third));
      }
    }catch(e){
      console.log(e);
    }
  };

  const handleDeleteImage = async(imageIndex) =>{
    switch(imageIndex){
      case 0:
        try{
          const res = await borrarImagen(deleteReference.image1);
          if(res){
            console.log('Imagen borrada exitosamente');
            setProductForm({...productForm, image1: ''});
            setDeleteReference({...deleteReference, image1: null});
            setPreviewUrls({...previewUrls, image1: null});
          }
          else{
            console.log('Something went wrong');
          }
        }catch(e){
          console.log(e);
        }
        break;
      case 1:
        try{
          const res = await borrarImagen(deleteReference.image2);
          if(res){
            console.log('Imagen borrada exitosamente');
            setProductForm({...productForm, image2: ''});
            setDeleteReference({...deleteReference, image2: null});
            setPreviewUrls({...previewUrls, image2: null});
          }
          else{
            console.log('Something went wrong');
          }
        }catch(e){
          console.log(e);
        }
        break;
      case 2:
        try{
          const res = await borrarImagen(deleteReference.image3);
          if(res){
            console.log('Imagen borrada exitosamente');
            setProductForm({...productForm, image3: ''});
            setDeleteReference({...deleteReference, image3: null});
            setPreviewUrls({...previewUrls, image3: null});
          }
          else{
            console.log('Something went wrong');
          }
        }catch(e){
          console.log(e);
        }
        break 
      default:
        break;
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

   // Función para obtener productos
   const getProducts = async () => {
    try {
      const response = await fetch(`${ProductServices}/getProducts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: state.userToken
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCurrentProducts(data); // Actualiza el estado con los productos obtenidos
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // useEffect para llamar a getProducts cuando se monte el componente o cambie categoryId
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className=" mx-auto">
      <h2 className="text-5xl font-extrabold text-gray-900 m-4 p-2 border-b-4 border-indigo-500 inline-block mb-4">
        Gestión de Productos
      </h2>
      <button
        className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow mb-6"
        onClick={toggleForm}
      >
        {showForm ? "Ocultar Formulario" : "Agregar Producto"}
      </button>
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Nombre del Producto
              </label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nombre del Producto"
                value={productForm.name}
                name="productName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Precio del Producto
              </label>
              <input
                type="number"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Precio del Producto"
                value={productForm.productPrice}
                name="productPrice"
                onChange={handleChange}
              />
            </div>
            {/* PICTURES TO UPLOAD  */}
            <label className="text-gray-700 font-semibold" htmlFor="images">
              Imagenes del producto 3 max
            </label>
            <div className="flex " id="images">
              <div>
                <input type="file" name="image1" onChange={handleImageChange} />
                {previewUrls.image1 && (
                  <img src={previewUrls.image1} alt="Preview" width="100" />
                )}
                <FaTrashAlt
                  className="text-2xl m-1 text-red-600"
                  onClick={()=>handleDeleteImage(0)}
                />
              </div>
              <div>
                <input type="file" name="image2" onChange={handleImageChange} />
                {previewUrls.image2 && (
                  <img src={previewUrls.image2} alt="Preview" width="100" />
                )}
                <FaTrashAlt
                  className="text-2xl m-1 text-red-600"
                  onClick={()=>handleDeleteImage(1)}
                />
              </div>
              <div>
                <input type="file" name="image3" onChange={handleImageChange} />
                {previewUrls.image3 && (
                  <img src={previewUrls.image3} alt="Preview" width="100" />
                )}
                <FaTrashAlt
                  className="text-2xl m-1 text-red-600"
                  onClick={()=>handleDeleteImage(2)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-green-700 font-semibold">Se puede Ofertar</label>
              <input
                type="checkbox"
                className="h-6 w-6 mt-2 text-green-700 bg-green-400"
                name="offert"
                onChange={() =>{
                  setProductForm({
                    ...productForm,
                    ["offert"]: !productForm.offert,
                  })
                  }
                }
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-gray-700 font-semibold">
                Descripción del Producto
              </label>
              <textarea
                className="border rounded-lg p-2 h-24 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Descripción del Producto"
                value={productForm.productDesc}
                name="productDesc"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-gray-700 font-semibold">
                STOCK del producto (Piezas Disponibles)
              </label>
              <input
                placeholder="ejemplo: ( 15 )"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="number"
                name="stock"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Marca</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Marca"
                name="brand"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Categoria</label>
              {/* WE NEED A SELECT HERE */}
              <select
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-red-600 font-medium"
                name="category"
                onChange={handleChange}
              >
                <option >---SELECCIONA UNA CATEGORIA ---</option>
                {CATEGORIES.map((category, index)=><option value={category.id} key={index}>{category.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Motores Aplicativos (separados por comas)
              </label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Motores Aplicativos"
                name="motorCompatibility"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">
                Modelos Aplicativos (separados por comas)
              </label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Modelos Aplicativos"
                name="modelCompatibility"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <h3 className="text-blue-600 font-semibold">Años Aplicativos</h3>
              <label className="text-gray-700 font-semibold">Desde</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Año de Aplicación Inicio"
                name="anioCompatibilityIni"
                onChange={handleChange}
              />
              <label className="text-gray-700 font-semibold">Hasta</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Año de Aplicación Fin"
                name="anioCompatibilityFin"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl text-indigo-600 font-semibold">LINK producto en marketplace</h3>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="link de producto en marketplace ejem(https://market...)"
                name="facebookUri"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow mt-4"
            onClick={handlePresubmit}
          >
            Agregar Producto
          </button>
        </div>
      )}
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-blue-800 text-white">
              Nombre del Producto
            </th>
            <th className="py-2 px-4 bg-blue-800 text-white">Precio</th>
            <th className="py-2 px-4 bg-blue-800 text-white">Imágenes</th>
            <th className="py-2 px-4 bg-blue-800 text-white">Oferta</th>
            <th className="py-2 px-4 bg-blue-800 text-white">Marca</th>
            <th className="py-2 px-4 bg-blue-800 text-white">
              Modelos Aplicativos
            </th>
            <th className="py-2 px-4 bg-blue-800 text-white">
              Motores Aplicativos
            </th>
            <th className="py-2 px-4 bg-blue-800 text-white">
              Año de Aplicación
            </th>
            <th className="py-2 px-4 bg-blue-800 text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                  <img
                    key={index}
                    src={product.photo}
                    alt={`Product ${index}`}
                    className="w-16 h-16 object-cover inline-block m-1 rounded-lg shadow"
                  />
              </td>
              <td className="border px-4 py-2">
                {product.offert ? (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Sí
                  </span>
                ) : (
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    No
                  </span>
                )}
              </td>
              <td className="border px-4 py-2">{product.brandID}</td>
              <td className="border px-4 py-2">
                {product.modelCompatibility}
              </td>
              <td className="border px-4 py-2">
                {product.motorCompatibility}
              </td>
              <td className="border px-4 py-2">{product.anioInCompt} - {product.anioOutCompt}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteProduct(product.id,product.photo)}
                >
                  <FaTrashAlt className="text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductCRUD;
