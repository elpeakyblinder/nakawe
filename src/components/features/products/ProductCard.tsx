'use client';

import React from 'react';
import style from './ProductCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthProvider';
import { toast } from 'sonner';
import { type Product } from '@/types';

interface ProductCardProps {
    product: Product & { artisan_name: string; category: string | null };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const { user } = useAuth();

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Debes iniciar sesión para añadir productos.');
            return;
        }
        addItem(product, 1);
        toast.success(`"${product.name}" se ha añadido al carrito.`);
    };

    return (
        <div className={style.containerCard}>
            <div className={style.imageCard}>
                <Image
                    src={product.main_image_url || '/default-product-image.png'}
                    alt={`Imagen de ${product.name}`}
                    fill
                    className={style.productImage}
                />
            </div>
            <div className={style.infoCard}>
                <div className={style.codeContainer}>
                    <span>{product.code}</span>
                </div>
                <div className={style.name}>
                    <h3>{product.name}</h3>
                </div>
                <div className={style.author}>
                    <span>Por: {product.artisan_name}</span>
                </div>
                <div className={style.location}>
                    <span>{product.origin}</span>
                </div>
                <div className={style.categoryContainer}>
                    <div className={style.category}>
                        <span>{product.category || 'Sin categoría'}</span>
                    </div>
                    <div>
                        <span className={style.author}>
                            Elaboración: {product.production_time}
                        </span>
                    </div>
                </div>
                <div className={style.price}>
                    <span>${product.price.toFixed(2)} MXN</span>
                </div>
                <div className={style.buttonsActions}>
                    <Button variant='primary' className="rounded p-1.5" onClick={handleAddToCart}>
                        Agregar al carrito
                    </Button>
                    <Link href={`/producto/${product.id}`}>
                        <Button variant="pistachio-black" className="rounded p-1.5" >Ver producto</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}