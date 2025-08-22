import React from 'react';
import styles from './CategoryBadge.module.css';

interface CategoryBadgeProps {
    categoryName: string | null;
    className?: string;
}

export default function CategoryBadge({ categoryName, className = '' }: CategoryBadgeProps) {
    if (!categoryName) {
        return ;
    }

    const combinedClassName = `${styles.badge} ${className}`;
    return (
        <div className={combinedClassName}>
            <span>{categoryName}</span>
        </div>
    );
}
