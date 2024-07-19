import ExampleResponse from './../utils/ExampleResponse.json'
import { Check } from '../utils/Icons';
import { Link } from 'react-router-dom';
export default function CardProduct({data}) {
  return (
    <Link to={`/product/${data.id}`} className="max-w-[300px] mx-auto rounded-xl shadow-md overflow-hidden border-solid border-4 border-sky-900 my-4 bg-gradient-delay">
      <div className="">
        <div className="flex justify-center">
          <img
            className="object-fill md:h-1/2"
            src={data.photo}
            alt="Modern building architecture"
          />
        </div>
        <div className="px-8 pt-8">
          <p className="uppercase tracking-wide text-sm text-black font-bold">
            {data.title}
          </p>
          <p className='my-2'>
            <span className='font-bold text-black'>Marca:</span> {data.brandID}
          </p>
          {
            data.offert ?(

          <p className='my-2 text-contrast font-elegant capitalize font-semibold flex justify-start'>
            Precio negociable <span className='mt-1 ml-1'>{Check()}</span>
          </p>
            ):
            <p className='my-2 text-prices text-center font-elegant capitalize font-semibold flex justify-start'>
               ! Comprar ahora !
            </p>
          }
          <p className='text-right text-2xl text-prices font-elegant font-bold tracking-wider'> 
              <span>${data.price} MXN</span>
          </p>
          <p className='text-md font-elegant text-blacks my-2'>
              Stock disponible: <span className='text-contrast font-elegant font-semibold'>{data.stock}</span>
          </p>
          <section className='flex justify-center pb-0 my-5'>
              <button id='buy' to={`/product/${ExampleResponse.results[0].id}`} className='bg-shipping p-3 text-white font-bold rounded-lg'>
                  COMPRAR
              </button>
              {
                data.offert >0 ?
                <button id='offert' className='p-2 text-center text-red-500'>
                    OFERTAR
                </button>
                :<></>
              }
          </section>
        </div>
      </div>
    </Link>
  );
}
