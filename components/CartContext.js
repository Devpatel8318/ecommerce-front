import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);
    // console.log(cartProducts);

    useEffect(() => {
        if (cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
        // else{
        //     ls?.setItem('cart', JSON.stringify([]));
        // }
    }, [cartProducts]);

    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    // useEffect(() => {
    //     if (cartProducts.length === 0||cartProducts === undefined || cartProducts.length < 0) {
    //         setCartProducts([]);
    //     }
    // }, []);

    function addProduct(productId) {
        setCartProducts(prev => {
            if(prev === undefined){
                prev = [];
            }
            return [...prev, productId]
        });
    }
    function removeProduct(productId) {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                const data = prev.filter((value, index) => index !== pos);
                // console.log(data);
                return data.length > 0 ? data : localStorage.removeItem('cart');
            }
            return prev;
        });
    }

    function clearCart() {
        setCartProducts([]);
        localStorage.removeItem('cart')
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}