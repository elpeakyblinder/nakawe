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
        const fetchAndValidateCart = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/cart');
                    if (res.ok) {
                        const data: CartItem[] = await res.json();
                        // Verificamos cada item del carrito contra su stock
                        const validatedCart = data.map(item => {
                            const availableStock = item.stock ?? 0;
                            if (item.quantity > availableStock) {
                                // Si la cantidad en el carrito es mayor que el stock, la ajustamos para evitar bugs y cosillas asi de la volatilidad que pueda tener el stock
                                toast.info(`La cantidad de "${item.name}" se ajustó al stock disponible.`);
                                return { ...item, quantity: availableStock };
                            }
                            return item;
                        }).filter(item => item.quantity > 0);

                        setCartItems(validatedCart);
                    }
                } catch (error) {
                    console.error("Error al cargar el carrito:", error);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchAndValidateCart();
    }, [user]);

    // --- LÓGICA OPTIMIZADA CON ACTUALIZACIONES OPTIMISTAS ---

    const addItem = async (product: Product & { artisan_name: string }, quantityToAdd: number) => {
        if (!user) return;

        const originalCart = [...cartItems];
        const availableStock = product.stock ?? 99;

        const existingItem = originalCart.find(item => item.id === product.id);

        if (existingItem && existingItem.quantity >= availableStock) {
            toast.info(`Ya tienes la cantidad máxima de "${product.name}" en tu carrito.`);
            return;
        }

        let optimisticCart: CartItem[];

        if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + quantityToAdd, availableStock);
            optimisticCart = originalCart.map(item =>
                item.id === product.id ? { ...item, quantity: newQuantity } : item
            );
        } else {
            const quantity = Math.min(quantityToAdd, availableStock);
            optimisticCart = [...originalCart, { ...product, quantity }];
        }

        setCartItems(optimisticCart);

        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: quantityToAdd }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo añadir el producto. Inténtalo de nuevo.');
            setCartItems(originalCart);
        }
    };

    const updateQuantity = async (productId: string, newQuantity: number) => {
        if (!user) return;

        const originalCart = [...cartItems];
        const itemToUpdate = originalCart.find(item => item.id === productId);
        if (!itemToUpdate) return;

        const availableStock = itemToUpdate.stock ?? 99;
        // Aseguramos que la nueva cantidad no supere el stock
        const quantity = Math.min(Math.max(1, newQuantity), availableStock);

        const newCart = originalCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(newCart); // Actualización optimista

        try {
            const res = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo actualizar la cantidad.');
            setCartItems(originalCart); // Revertir en caso de error
        }
    };

    const removeItem = async (productId: string) => {
        const originalCart = [...cartItems];
        const newCart = originalCart.filter(item => item.id !== productId);
        setCartItems(newCart);

        try {
            const res = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity: 0 }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo eliminar el producto.');
            setCartItems(originalCart);
        }
    };

    const clearCart = async () => {
        if (!user) return;
        const originalCart = [...cartItems];
        setCartItems([]);

        try {
            const res = await fetch('/api/cart', { method: 'DELETE' });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo vaciar el carrito.');
            setCartItems(originalCart);
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems, addItem, removeItem, updateQuantity, clearCart, subtotal, totalItems,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
