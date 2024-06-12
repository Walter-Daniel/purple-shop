import { Title } from '@/components';
import Link from 'next/link';

export default function AddressPage() {
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Shipping"/>

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

          <div className="flex flex-col mb-2">
            <label>First name</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Last name</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Address</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Address line 2 (optional)</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Zip code</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>City</label>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <label>Country</label>
            <select 
              className="p-2 border rounded-md bg-gray-200"
            >
              <option value="">[ Select ]</option>
              <option value="ARG">Argentina</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Mobile phone number</span>
            <input 
              type="text" 
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link 
              href='/checkout'
              className="btn-primary flex w-full sm:w-1/2 justify-center ">
              Siguiente
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}