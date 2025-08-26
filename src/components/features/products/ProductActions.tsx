'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthProvider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { type Product } from '@/types';
import FormattedPrice from '@/components/ui/FormattedPrice';
import QuantitySelector from '@/components/ui/count/QuantitySelector';

interface ProductActionsProps {
    product: Product & { artisan_name: string };
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { user } = useAuth();

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Debes iniciar sesión para añadir productos al carrito.');
            return;
        }
        addItem(product, quantity);
        toast.success(`${quantity} "${product.name}" se ha(n) añadido al carrito.`);
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start sm:gap-4">
                <FormattedPrice className="text-4xl font-medium text-[var(--color-principal-ui)]" amount={product.price} currency='MXN' />
                <QuantitySelector
                    maxQuantity={product.stock || 99}
                    onChange={setQuantity}
                />
            </div>
            <div className='flex w-full sm:w-auto gap-3'>
                <Button 
                    variant='primary' 
                    onClick={handleAddToCart} 
                    className="flex-grow sm:flex-grow-0 rounded px-4 py-2 w-auto whitespace-nowrap"
                >
                    Añadir al carrito
                </Button>
                <Button 
                    variant='pistachio-black' 
                    className="flex-grow sm:flex-grow-0 rounded px-4 py-2 w-auto whitespace-nowrap"
                >
                    Comprar ahora
                </Button>
            </div>
        </div>
    );
}