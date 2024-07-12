import { useState } from "react";
import { NextImage, BackImage } from "../../utils/Icons";
export default function IndividualSpecs({ product = { name: "Piece" } }) {
  const imagesAvailable = product.images.length;
  const messageOffert = encodeURI(`Hola que tal, vi el producto ${product.id} y quisiera negociar el precio.`); 
  const [currentImge, setCurrentImage] = useState(0);
  return (
    <div>
      {/* Contenedor principal */}
      <h3 className="text-3xl font-bold capitalize m-8 text-center">
        {product.name}
      </h3>
      <div className="md:flex p-2 justify-center items-start ">
        <div className="md:basis-1/2">
          <picture className="flex p-3 my-5 md:mt-24 justify-center items-center md:h-[350px]">
            <button className="px-4"
              onClick={() => {
                if (currentImge > 0) {
                  setCurrentImage((prev) => prev - 1);
                } else {
                  setCurrentImage(0);
                }
              }}
            >
              <BackImage />
            </button>
            <img
              src={`${product.images[currentImge]}`}
              alt="Product Image"
              className="w-3/4 object-cover max-h-80 my-0 mx-auto rounded-sm"
            />
            <button className="px-4"
              onClick={() => {
                if (currentImge < imagesAvailable - 1) {
                  setCurrentImage((prev) => prev + 1);
                } else {
                  setCurrentImage(0);
                }
              }}
            >
              <NextImage />
            </button>
          </picture>
        </div>
        <div className="md:basis-1/2 text-center m-5">
          <div id="specs" className="p-2 mx-4 space-y-6">
            <p className="font-elegant text-justify my-4">
              <span className="font-bold">Descripcion: </span> {product.desc}
            </p>
            <p className="font-elegant text-justify my-4">
              <span className="font-bold">Marca: </span> {product.marca}
            </p>
            <p className="font-bold  text-justify my-4">Modelos Aplica: </p>
            <br />
            {product.modelAplicativo.map((models, index) => {
              return (
                <span
                  className="rounded-lg p-2 font-semibold bg-prices text-white font-elegant m-2"
                  key={index}
                >
                  {models}
                </span>
              );
            })}
            <p className="font-elegant text-justify my-4">
              <span className="font-bold">Motores:</span>
              {product.motorAplicativo.map((motors, index) => {
                return (
                  <span
                    className="rounded-lg p-2 bg-prices font-bold text-white font-elegant mx-2"
                    key={index}
                  >
                    {motors}
                  </span>
                );
              })}
            </p>
            <p className="font-bold text-justify my-4">
              Año aplicativo:{" "}
              <span className="font-elegant font-normal">
                {product.anioAplicacion}
              </span>
            </p>
          </div>
          <div id="priceSect" className="my-4">
            <span className="font-bold font-elegant text-sky-700 text-4xl">
              ${product.price}.00 MXN
            </span>
          </div>
        </div>
      </div>
      <div
        id="btnControls"
        className="flex justify-center items-center space-x-3 mb-5"
      >
        <a href={`${product.facebookUri}`} className="bg-shipping text-white font-semibold p-3 rounded-xl mx-4 transition-all hover:-translate-y-3 hover:bg-blue-700">
          COMPRAR
        </a>
        <a href={`${product.offerUri}${messageOffert}`} className=" text-red-600 font-semibold p-3 rounded-xl mx-4 transition-all hover:-translate-y-3 hover:bg-green-700 hover:text-white">
          OFERTAR
        </a>
      </div>
    </div>
  );
}
