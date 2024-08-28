"use client";

import { deleteProductImage } from "@/actions";
import { createUpdateProduct } from "@/actions/products/create-update-product";
import { ProductImage } from "@/components";
import {
  Category,
  Product,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  product: Partial<Product> & { Images?: ProductWithImage[] };
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
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const resp = await createUpdateProduct(formData);

    if (!resp.ok) {
      toast.error(resp.message);
    }else{
      toast.success(resp.message);
      router.replace(`/admin/product/${resp.product!.slug}`);
    }

  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            id="slug"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("slug")}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={5}
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("description")}
          ></textarea>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("price")}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("tags")}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="gender">Gender</label>
          <select
            id="select"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("gender")}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("categoryId")}
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-6">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            {...register("inStock")}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col mb-6">
          <label htmlFor="sizes">Sizes</label>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border rounded-md mr-2 w-14 transition-all text-center border-black cursor-pointer",
                  {
                    "bg-black text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="image">Images</label>
          <input
            type="file"
            id="image"
            {...register("images")}
            multiple
            className="p-2 border rounded-md bg-gray-200 border-gray-400"
            accept="image/png, image/jpeg, image/avif"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
          {product.Images?.map((image) => (
            <div key={image.id}>
              <ProductImage
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                className="rounded shadow-md"
              />
              <button
                type="button"
                onClick={() => deleteProductImage(image.id, image.url)}
                className="btn-danger w-full rounded-b-xl"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className="btn-primary w-full">Guardar</button>
    </form>
  );
};
