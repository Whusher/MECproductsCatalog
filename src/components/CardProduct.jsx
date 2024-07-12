import ExampleResponse from './../utils/ExampleResponse.json'
import { Check } from '../utils/Icons';
import { Link } from 'react-router-dom';
export default function CardProduct() {
  return (
    <Link to={`/product/${ExampleResponse.results[0].id}`} className="max-w-[300px] mx-auto rounded-xl shadow-md overflow-hidden border-solid border-4 border-sky-900 my-4 bg-gradient-delay">
      <div className="">
        <div className="flex justify-center">
          <img
            className="w-32 object-contain md:h-full "
            src={ExampleResponse.results[0].thumbnail}
            alt="Modern building architecture"
          />
        </div>
        <div className="px-8 pt-8">
          <p className="uppercase tracking-wide text-sm text-black font-bold">
            {ExampleResponse.results[0].title}
          </p>
          <p className='my-2'>
            <span className='font-bold text-black'>{ExampleResponse.results[0].attributes[0].name}:</span> {ExampleResponse.results[0].attributes[0].values[0].name}
          </p>
          <p className='my-2 text-contrast font-elegant capitalize font-semibold flex justify-start'>
            Precio negociable <span className='mt-1 ml-1'>{Check()}</span>
          </p>
          <p className='text-right text-2xl text-prices font-elegant font-bold tracking-wider'> 
              <span>${ExampleResponse.results[0].price}.00 {ExampleResponse.results[0].currency_id}</span>
          </p>
          <section className='flex justify-between pb-0 my-5'>
              <button id='buy' to={`/product/${ExampleResponse.results[0].id}`} className='bg-shipping p-3 text-white font-bold rounded-lg'>
                  COMPRAR
              </button>
              <button id='offert' className='p-2 text-center text-red-500'>
                  OFERTAR
              </button>
          </section>
        </div>
      </div>
    </Link>
  );
}
