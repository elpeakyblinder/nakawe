import { FormattedPriceProps } from "@/types";
import React from "react";

export default function FormattedPrice({
    amount,
    currency = 'MXN',
    locale = 'es-MX',
    className = '',
    showCurrencyCode = true,
}: FormattedPriceProps) {

    const formattedPrice = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);

    return (
        <span className={className}>
            {formattedPrice}
            {showCurrencyCode && <span className="ml-1 text-sm">{currency}</span>}
        </span>
    );
}
