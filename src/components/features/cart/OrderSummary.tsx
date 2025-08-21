'use client';

import React from 'react';
import style from './OrderSummary.module.css';

interface OrderSummaryProps {
    subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
    // --- LÓGICA DE NEGOCIO (CÁLCULOS) ---
    const IVA_RATE = 0.16; // 16%
    const iva = subtotal * IVA_RATE;

    // Regla de envío basada en el texto informativo
    const shippingCost = subtotal > 2000 ? 0 : 150;
    const total = subtotal + iva + shippingCost;

    return (
        <div className={style.container}>
            <div className={style.summary}>
                <div>
                    <h2 className={style.title}>
                        Resumen del pedido
                    </h2>
                </div>
                <div className={style.orderDetails}>
                    <div className={style.details}>
                        <span>Subtotal:</span>
                        {/* Muestra el subtotal dinámico */}
                        <span>${subtotal.toFixed(2)} MXN</span>
                    </div>
                    <div className={style.details}>
                        <span>IVA (16%)</span>
                        {/* Muestra el IVA dinámico */}
                        <span>${iva.toFixed(2)} MXN</span>
                    </div>
                    <div className={style.details}>
                        <span>Envío</span>
                        {/* Muestra el costo de envío dinámico */}
                        <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)} MXN`}</span>
                    </div>
                    <hr className='my-2 border-gray-200' />
                    <div className={`${style.details} font-bold text-lg`}>
                        <span>Total:</span>
                        <span>${total.toFixed(2)} MXN</span>
                    </div>
                    <div className={style.buttonsBuy}>
                        <button
                            className={style.buttonPay}
                            // Deshabilita el botón si no hay productos en el carrito
                            disabled={subtotal === 0}
                        >
                            Proceder con el pago
                        </button>
                        <button className={style.buttonContinue}>
                            Seguir descubriendo
                        </button>
                    </div>
                    <div className={style.info}>
                        <p>
                            Para pedidos mayores a $2000, el envío es gratis. De lo contrario, el costo de envío es de $150.00 MXN.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}