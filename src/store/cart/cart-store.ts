import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    AddProductToCart: (product: CartProduct) => void; 
}

export const useCartStore = create<State>()( 

    persist(
        (set, get) =>({

            cart: [],
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce( ( total, item ) => total + item.quantity, 0 )
            },
    
            //Methods
    
            AddProductToCart: ( product: CartProduct ) => {
                const { cart } = get();
    
                //"1. Check if the product exists in the cart with the correct size"
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );
    
                if( !productInCart ){
                    set({ cart: [...cart, product] });
                    return;
                }
    
                //2. Update cart quantity
                const updatedCartProducts = cart.map( (item) => {
                    if( item.id === product.id && item.size === product.size){
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
    
                    return item;
                })
    
                set({ cart: updatedCartProducts });
    
            }
    
        }),
        { 
            name: 'shopping-cat' 
        }
    )
    
)