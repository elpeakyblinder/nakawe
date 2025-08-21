'use client';

import { useContext } from 'react';
import { FavoritesContext } from '@/context/FavoritesProvider';
import { type FavoritesContextType } from '@/types';

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);

    // Asegura que el hook se use dentro de un FavoritesProvider
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }

    return context;
};