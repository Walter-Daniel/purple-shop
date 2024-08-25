import { CartProduct } from "@/interfaces";

interface PaginationOption {
    page?: number;
    take?: number;
    productsInCart?: CartProduct[];
}

export const getPaginatedProductInCart = ({
    page = 1,
    take = 4,
    productsInCart = []
}: PaginationOption) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const totalCount = productsInCart.length;
    const totalPages = Math.ceil(totalCount / take);

    // Calcular el índice de inicio y fin para la paginación
    const startIndex = (page - 1) * take;
    const endIndex = Math.min(startIndex + take, totalCount);

    // Obtener los productos correspondientes a la página actual
    const paginatedProducts = productsInCart.slice(startIndex, endIndex);

    return {
        currentPage: page,
        totalPages: totalPages,
        products: paginatedProducts
    };
};
