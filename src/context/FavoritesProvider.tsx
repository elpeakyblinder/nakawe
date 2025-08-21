'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { type FavoriteItem, type Product, type FavoritesContextType } from '@/types';
import { toast } from 'sonner';

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
    const { user } = useAuth();

    // Carga los favoritos del usuario desde la base de datos cuando la sesión cambia
    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const res = await fetch('/api/favorites');
                    if (res.ok) {
                        const data = await res.json();
                        setFavoriteItems(data);
                    }
                } catch (error) {
                    console.error("Error al cargar los favoritos:", error);
                }
            } else {
                // Si no hay usuario, la lista de favoritos está vacía
                setFavoriteItems([]);
            }
        };
        fetchFavorites();
    }, [user]);

    // --- Lógica de Negocio con Actualizaciones Optimistas ---

    const addFavorite = async (product: Product & { artisan_name: string }) => {
        if (!user) return;

        // Actualización optimista: añade el producto a la UI inmediatamente
        const newFavorite: FavoriteItem = { ...product, artisan_name: product.artisan_name };
        const originalFavorites = [...favoriteItems];
        setFavoriteItems(prev => [...prev, newFavorite]);

        try {
            const res = await fetch('/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo añadir a favoritos.');
            setFavoriteItems(originalFavorites); // Revertir en caso de error
        }
    };

    const removeFavorite = async (productId: string) => {
        if (!user) return;

        // Actualización optimista: quita el producto de la UI inmediatamente
        const originalFavorites = [...favoriteItems];
        setFavoriteItems(prev => prev.filter(item => item.id !== productId));

        try {
            const res = await fetch('/api/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId }),
            });
            if (!res.ok) throw new Error('Error en el servidor');
        } catch (error) {
            toast.error('No se pudo quitar de favoritos.');
            setFavoriteItems(originalFavorites); // Revertir en caso de error
        }
    };

    // Función útil para saber si un producto ya está en favoritos
    const isFavorite = (productId: string): boolean => {
        return favoriteItems.some(item => item.id === productId);
    };

    const value = {
        favoriteItems,
        addFavorite,
        removeFavorite,
        isFavorite,
    };

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}