'use client';

import { type Product } from '@/types';
import ProductCard from "@/components/features/products/ProductCard";
import { motion, type Variants } from 'framer-motion';

interface CollectionProductsGridProps {
    products: (Product & { artisan_name: string; category: string | null })[];
}

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export default function CollectionProductsGrid({ products = [] }: CollectionProductsGridProps) {
    if (products.length === 0) {
        return <p className="text-center text-gray-500">No hay productos en esta colección todavía.</p>;
    }

    return (
        <motion.div
            className="w-full mx-auto grid gap-8 px-4 sm:px-6 lg:px-8 py-8 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }} 
        >
            {products.map((product) => (
                <motion.div key={product.id} variants={cardVariants}>
                    <ProductCard
                        product={product}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}