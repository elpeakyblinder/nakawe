'use client';

import { useCart } from '@/hooks/useCart';
import CartProductsList from '@/components/features/cart/CartProductsList';
import OrderSummary from '@/components/features/cart/OrderSummary';
import React from 'react';

const PageCart = () => {
    const { cartItems, totalItems, subtotal, removeItem, updateQuantity } = useCart();

    return (
        <div className="container mx-auto px-8 py-8">
            <div className="text-lg">
                <div>
                    <h2 className='text-4xl text-[var(--color-principal-ui)] font-semibold mb-1'>
                        Carrito de compras
                    </h2>
                </div>
                <div className='mb-5'>
                    <span className='text-1xl font-light'>
                        {totalItems} productos en tu carrito
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                <div className="lg:col-span-7">
                    <CartProductsList 
                        items={cartItems} 
                        onRemove={removeItem} 
                        onUpdateQuantity={updateQuantity} 
                    />
                </div>
                <div className="lg:col-span-3">
                    <OrderSummary subtotal={subtotal} />
                </div>
            </div>
        </div>
    );
};

export default PageCart;