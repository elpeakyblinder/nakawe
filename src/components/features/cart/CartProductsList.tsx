import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';
import { type CartItem } from '@/types';
import style from './CartProductsList.module.css'

import React from 'react'
import FormattedPrice from '@/components/ui/FormattedPrice';
interface CartProductsListProps {
    items: CartItem[];
    onRemove: (productId: string) => void;
    onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export default function CartProductsList({ items, onRemove, onUpdateQuantity }: CartProductsListProps) {
    // Si no hay items, entonces mostras un mensaje de que el carrito está vacío
    if (items.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Tu carrito está vacío.</p>
                <Link href="/colecciones" className="mt-4 inline-block text-primary hover:text-primary-hover font-semibold">
                    Explorar las colecciones que tenemos para ti
                </Link>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.productsList}>
                {/* Mapeamos cada item del carrito a un bloque de producto */}
                {items.map((item) => (
                    <div key={item.id} className={style.productContainer}>
                        <div className={style.product}>
                            <div className={style.imageProduct}>
                                <div>
                                    <Image
                                        src={item.main_image_url || '/productoEjemplo.png'}
                                        alt={item.name}
                                        width={200}
                                        height={100}
                                    />
                                </div>
                            </div>
                            <div className={style.infoProduct}>
                                <div className={style.codeContainer}>
                                    <span className={style.code}>
                                        {item.code}
                                    </span>
                                    <button onClick={() => onRemove(item.id)} className={style.remove}>
                                        <Trash2 />
                                    </button>
                                </div>
                                <div className={style.name}>
                                    <span>
                                        {item.name}
                                    </span>
                                </div>
                                <div className={style.author}>
                                    <span>
                                        Por: {item.artisan_name || 'Artista Desconocido'}
                                    </span>
                                </div>
                                <div className={style.author}>
                                    <span>
                                        Origen: {item.origin}
                                    </span>
                                </div>
                                <div className={style.categoryContainer}>
                                    <div className={style.category}>
                                        <span>{item.category || 'Categoría'}</span>
                                    </div>
                                    <div>
                                        <span className={style.author}>
                                            Tiempo de elaboracion: {item.production_time}
                                        </span>
                                    </div>
                                </div>
                                <div className={style.priceContainer}>
                                    <div>
                                        <div>
                                            <span className={style.author}>
                                                Cantidad:
                                            </span>
                                        </div>
                                        <div className={style.quantityControl}>
                                            <button
                                                type="button"
                                                className={style.quantityButton}
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className={style.quantityDisplay}>{item.quantity}</span>
                                            <button
                                                type="button"
                                                className={style.quantityButton}
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.price}>
                                        <span>
                                            <FormattedPrice amount={item.price * item.quantity} currency='MXN'/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
