'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartProvider';
import { type CartContextType } from '@/types';


// Atajo para poder usar useCart y ya
export function useCart(): CartContextType {
    const context = useContext(CartContext);

    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

