"use client";

import { Category, Product, ProductImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & { Images?:ProductImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
}


export const ProductForm = ({ product, categories }: Props) => {

  const {
    handleSubmit,
    register,
    formState: {isValid},
    getValues,
    setValue,
    watch
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(', '),
      sizes: product.sizes ?? []
    }
  }); 

  watch('sizes');

  const onSizeChanged = (size:string) => {
    console.log({size})
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue('sizes', Array.from(sizes))
  }

  const onSubmit = async(data:FormInputs) => {
    console.log({data});
  }

  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("title")}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("slug")}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description")}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register("price")}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("tags")}/>
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("gender")}>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("categoryId")}>
            <option value="">[Select]</option>
            {
              categories.map(category => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Sizes</span>
          <div className="flex flex-wrap">
            
            {
              sizes.map( size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div key={ size } 
                onClick={() => onSizeChanged(size)}
                className={
                  clsx("p-2 border rounded-md mr-2 w-14 transition-all text-center border-black cursor-pointer", 
                    {
                      'bg-black text-white': getValues('sizes').includes(size)
                    }
              )}
                >
                  <span>{ size }</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Fotos</span>
            <input 
              type="file"
              multiple 
              className="p-2 border rounded-md bg-gray-200" 
              accept="image/png, image/jpeg"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
            {
              product.Images?.map(image => (
                <div key={image.id}>
                    <Image 
                      alt={product.title ?? ''}
                      src={`/products/${image.url}`}
                      width={300}
                      height={300}
                      className="rounded shadow-md"
                    />
                    <button 
                    type="button"
                    onClick={() => console.log(image.id)}
                    className="btn-danger w-full rounded-b-xl">
                      Delete
                    </button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};