'use client'
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantitySelector.module.css';

interface QuantitySelectorProps {
    initialQuantity?: number;
    maxQuantity?: number;
    onChange: (newQuantity: number) => void; // Función para comunicar el cambio
}

export default function QuantitySelector({
    initialQuantity = 1,
    maxQuantity = 99,
    onChange,
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrement = () => {
        const newQuantity = Math.min(quantity + 1, maxQuantity);
        setQuantity(newQuantity);
        onChange(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        onChange(newQuantity);
    };

    return (
        <div className={styles.quantityControl}>
            <button
                type="button"
                onClick={handleDecrement}
                className={styles.quantityButton}
                disabled={quantity <= 1}
            >
                <Minus size={16} />
            </button>
            <span className={styles.quantityDisplay}>{quantity}</span>
            <button
                type="button"
                onClick={handleIncrement}
                className={styles.quantityButton}
                disabled={quantity >= maxQuantity}
            >
                <Plus size={16} />
            </button>
        </div>
    );
}