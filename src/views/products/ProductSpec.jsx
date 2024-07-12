import Layout from "../Layout";
import IndividualSpecs from "../../components/product/IndividualSpecs";
import { useParams } from "react-router-dom";
export default function ProductSpec() {
  const {id} = useParams(); //Hacer un fetching data specific del producto conociendo ahora su ID
  const producto = {
    id,
    name: 'Tapa de valvulas Chevrolet',
    images: ['https://th.bing.com/th/id/OIP.L__fAlarvjLWWrsKNyI4WQHaDA?rs=1&pid=ImgDetMain',
        'https://th.bing.com/th/id/OIP.A0kxXNtIh2lVsRpZ_xbElAAAAA?rs=1&pid=ImgDetMain',
        'https://wallpapercave.com/wp/wp1910240.jpg'],//Probablemente base 64 un array de images
    price: '5000',
    offer: false,
    desc: 'Producto hecho bla bla bla bla para tener calidad el el motor etc',
    marca: 'Chevrolet Performance',
    modelAplicativo: ['Opel', 'Astra', 'Chevy'],
    motorAplicativo: ['1.0L','1.8L'],
    anioAplicacion: '2004-2010',
    facebookUri: 'https://www.facebook.com/marketplace/item/7111273052313596/',
    defaultUriBuy: '',
    offerUri: 'https://m.me/315210798348568?ref='
  }
  return (
    <Layout
        child={
        <IndividualSpecs product={producto}/>
        }
    />
  )
}
