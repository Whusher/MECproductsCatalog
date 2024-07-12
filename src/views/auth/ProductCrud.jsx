import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { subirImagen,borrarImagen } from "../../helpers/firebase/Config";

function initializeForm() {
  return {
    productName: "",
    productPrice: "",
    productDesc: "",
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
    whatsappUri: "", //Get from context provider
  };
}

const CATEGORIES =[
  { id: 1, nombre: "Cabezas de Motor" },
  { id: 2, nombre: "Arboles de Levas" },
  { id: 3, nombre: "Cigueñales" },
  { id: 4, nombre: "Bielas" },
  { id: 5, nombre: "Discos y Rotores" },
  { id: 6, nombre: "Balatas Nuevas" },
  { id: 7, nombre: "Suspension Completa" },
  { id: 8, nombre: "Facias" },
  { id: 9, nombre: "Mas Sobre Chasis" }
];

function ProductCRUD() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tapa de válvulas Chevrolet",
      price: "5000",
      images: [
        "https://th.bing.com/th/id/OIP.L__fAlarvjLWWrsKNyI4WQHaDA?rs=1&pid=ImgDetMain",
      ],
      offer: false,
      desc: "Producto hecho bla bla bla bla para tener calidad el el motor etc",
      marca: "Chevrolet Performance",
      modelAplicativo: ["Opel", "Astra", "Chevy"],
      motorAplicativo: ["1.0L", "1.8L"],
      anioAplicacion: "2004-2010",
    },
    {
      id: 2,
      name: "Juego de Discos de Freno Brembo",
      price: "8000",
      images: [
        "https://m.media-amazon.com/images/I/51pubrGhFYL._SR290,290_.jpg",
      ],
      offer: true,
      desc: "Discos de freno de alta calidad para un rendimiento óptimo de frenado en condiciones extremas.",
      marca: "Brembo",
      modelAplicativo: ["Audi", "BMW", "Mercedes"],
      motorAplicativo: ["2.0T", "3.0T"],
      anioAplicacion: "2015-2022",
    },
    {
      id: 3,
      name: "Neumáticos Michelin Pilot Sport 4S",
      price: "12000",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVNB8wf0rA_ayvbEHmrBVcBpmeyxA0M_ByQ&s",
      ],
      offer: false,
      desc: "Neumáticos de alto rendimiento para condiciones de carretera seca y mojada.",
      marca: "Michelin",
      modelAplicativo: ["Porsche", "Ferrari", "Lamborghini"],
      motorAplicativo: ["4.0L V8", "3.0L V6"],
      anioAplicacion: "2018-2023",
    },
    {
      id: 4,
      name: "Aceite Sintético Mobil 1 5W-30",
      price: "350",
      images: [
        "https://contentinfo.autozone.com/znetcs/product-info/es/MX/mob/124999/image/8/",
      ],
      offer: true,
      desc: "Aceite sintético de alto rendimiento para motores de gasolina y diésel.",
      marca: "Mobil 1",
      modelAplicativo: ["Toyota", "Honda", "Ford"],
      motorAplicativo: ["1.6L", "2.0L"],
      anioAplicacion: "2010-2025",
    },
  ]);
  //Real necessary states
  const [productForm, setProductForm] = useState(initializeForm());
  const [showForm, setShowForm] = useState(false);
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

  const handlePresubmit = () => {

    console.log(productForm);
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


  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
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
                onChange={() =>
                  setProductForm({
                    ...productForm,
                    ["offert"]: !productForm.offert,
                  })
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
                {CATEGORIES.map((category, index)=><option value={category.id} key={index}>{category.nombre}</option>)}
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
            <th className="py-2 px-4 bg-blue-800 text-white">Descripción</th>
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
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Product ${idx}`}
                    className="w-16 h-16 object-cover inline-block m-1 rounded-lg shadow"
                  />
                ))}
              </td>
              <td className="border px-4 py-2">
                {product.offer ? (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Sí
                  </span>
                ) : (
                  <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                    No
                  </span>
                )}
              </td>
              <td className="border px-4 py-2">{product.desc}</td>
              <td className="border px-4 py-2">{product.marca}</td>
              <td className="border px-4 py-2">
                {product.modelAplicativo.join(", ")}
              </td>
              <td className="border px-4 py-2">
                {product.motorAplicativo.join(", ")}
              </td>
              <td className="border px-4 py-2">{product.anioAplicacion}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  onClick={() => {}}
                >
                  <FaEdit className="text-2xl" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDeleteProduct(index)}
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
