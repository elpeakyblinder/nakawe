"use client"

import React from 'react'
import ProductCard from "@/components/features/products/ProductCard"
import { useFavorites } from '@/hooks/useFavorites' // 1. Importamos el hook

const FavoritesPage = () => {
    // 2. Usamos el hook para obtener la lista de favoritos
    const { favoriteItems } = useFavorites();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div>
                <h2 className='text-4xl text-primary font-semibold mb-1'>
                    Mis Favoritos
                </h2>
            </div>
            <div className='mb-8'>
                <span className='text-lg font-light'>
                    {favoriteItems.length} productos en tus favoritos
                </span>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {favoriteItems.map(item => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>

            {favoriteItems.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500">Aún no has guardado ningún producto como favorito.</p>
                </div>
            )}
        </div>
    )
}

export default FavoritesPage