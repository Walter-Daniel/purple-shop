export { getUserAddress } from './address/get-user-address';
export {setUserAddress} from './address/set-user-address';
export { deleteUserAddress } from './address/delete-user-address';

export * from './auth/login';
export * from './auth/logout';
export { registerUser } from './auth/register';

export { getPaginatedProductInCart } from './cart/get-pagination-cart';

export { getCountries }from './country/getCountries';

export { placeOrder } from './order/place-order';
export { getOrderById} from './order/get-order-by-id';
export { getOrdersByUser } from './order/get-orders-by-user';
export { getPaginatedOrders } from './order/get-paginated-orders';

export { setTransactionId } from './payments/set-transaction-id';
export { paypalCheckPayment } from './payments/paypal-check-payment';

export { getCategories } from './products/get-categories';
export { getPaginatedProductWithImages } from './products/product-pagination';
export { getProductBySlug } from './products/get-product-slug';
export { getStockBySlug } from './products/get-stock-by-slug';
export { deleteProductImage } from './products/delete-product-image';

export { getPaginatedUsers } from './user/get-paginated-users';
export { updateUserData } from './user/update-user-data';