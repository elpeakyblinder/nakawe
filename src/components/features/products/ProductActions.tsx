'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { type Product } from '@/types';
import { Minus, Plus } from 'lucide-react';

interface ProductActionsProps {
    product: Product & { artisan_name: string };
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { user } = useAuth();

    const handleAddToCart = () => {
        if (!user) {
            // Mostramos una notificación de error
            toast.error('Debes iniciar sesión para añadir productos al carrito.');
            return;
        }

        // Si hay sesión, añadimos el producto y mostramos una notificación de éxito
        addItem(product, quantity);
        toast.success(`${quantity} "${product.name}" se ha(n) añadido al carrito.`);
    };

    const increment = () => {
        setQuantity(prev => Math.min(prev + 1, product.stock || 99));
    };

    const decrement = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    return (
        <div className="productoPrecio">
            <span>${product.price} MXN</span>
            <div className="flex items-center gap-4 mt-4">
                <div className="quantityControl">
                    <button type="button" onClick={decrement} className="quantityButton">
                        <Minus size={16} />
                    </button>
                    <span className="quantityDisplay">{quantity}</span>
                    <button type="button" onClick={increment} className="quantityButton">
                        <Plus size={16} />
                    </button>
                </div>
                <div className='flex gap-3'>
                    <Button variant='primary' onClick={handleAddToCart} className="rounded px-4 py-2 w-auto whitespace-nowrap">
                        Añadir al carrito
                    </Button>
                    <Button variant='pistachio-black' className="rounded px-4 py-2 w-auto whitespace-nowrap">
                        Comprar ahora
                    </Button>
                </div>
            </div>
        </div>
    );
}