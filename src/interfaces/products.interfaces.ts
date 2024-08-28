export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    // type: ValidTypes;
    gender: GenderCategory;
}

export interface CartProduct {
    id: string;
    image: string;
    price: number;
    quantity: number;
    size: Size;
    slug: string;
    title: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type Types = 'shirts'|'pants'|'hoodies'|'hats';
export type GenderCategory = 'men'|'women'|'kid'|'unisex'
