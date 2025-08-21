'use client';

import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthProvider';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { type Product } from '@/types';

interface FavoriteToggleButtonProps {
    product: Product & { artisan_name: string };
}

export default function FavoriteToggleButton({ product }: FavoriteToggleButtonProps) {
    const { user } = useAuth();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    const isProductFavorite = isFavorite(product.id);

    const handleToggleFavorite = () => {
        if (!user) {
            toast.error('Debes iniciar sesión para guardar favoritos.');
            return;
        }

        if (isProductFavorite) {
            removeFavorite(product.id);
            toast.info(`"${product.name}" se ha eliminado de favoritos.`);
        } else {
            addFavorite(product);
            toast.success(`"${product.name}" se ha añadido a favoritos.`);
        }
    };

    return (
        <button onClick={handleToggleFavorite} title="Añadir a favoritos" className="text-gray-400 hover:text-primary transition-colors">
            <Heart
                size={28}
                // El corazón se rellena si es favorito
                className={isProductFavorite ? 'fill-primary text-primary' : ''}
            />
        </button>
    );
}
