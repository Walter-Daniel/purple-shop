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
    gender: Category;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';
export type Category = 'men'|'women'|'kid'|'unisex'
