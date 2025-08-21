'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { type CartItem, type Product, type CartContextType } from '@/types';
import { toast } from 'sonner';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { user } = useAuth();

    // Carga el carrito desde la base de datos cuando el usuario cambia
    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/cart');
                    if (res.ok) {
                        const data = await res.json();
                        setCartItems(data);
                    }
                } catch (error) {
                    console.error("Error al cargar el carrito:", error);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCart();
    }, [user]);

    // --- LÓGICA OPTIMIZADA CON ACTUALIZACIONES OPTIMISTAS ---

    const addItem = async (product: Product & { artisan_name: string }, quantityToAdd: number) => {
        if (!user) return;

        const optimisticCart = [...cartItems];
        const existingItemIndex = optimisticCart.findIndex(item => item.id === product.id);

        if (existingItemIndex > -1) {
            optimisticCart[existingItemIndex].quantity += quantityToAdd;
        } else {
            optimisticCart.push({ ...product, quantity: quantityToAdd });
        }
        
        setCartItems(optimisticCart); // Actualización optimista

        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: quantityToAdd }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo añadir el producto. Inténtalo de nuevo.');
            setCartItems(cartItems); // Revertir en caso de error
        }
    };

    const removeItem = async (productId: string) => {
        const originalCart = [...cartItems];
        const newCart = originalCart.filter(item => item.id !== productId);
        setCartItems(newCart); // Actualización optimista

        try {
            const res = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity: 0 }), // Enviar 0 para eliminar
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo eliminar el producto.');
            setCartItems(originalCart); // Revertir en caso de error
        }
    };

    const updateQuantity = async (productId: string, newQuantity: number) => {
        if (!user || newQuantity < 1) return;

        const originalCart = [...cartItems];
        const newCart = originalCart.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(newCart); // Actualización optimista

        try {
            const res = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo actualizar la cantidad.');
            setCartItems(originalCart); // Revertir en caso de error
        }
    };
    
    const clearCart = async () => {
        if (!user) return;
        const originalCart = [...cartItems];
        setCartItems([]); // Actualización optimista

        try {
            const res = await fetch('/api/cart', { method: 'DELETE' });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo vaciar el carrito.');
            setCartItems(originalCart); // Revertir
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems, addItem, removeItem, updateQuantity, clearCart, subtotal, totalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
