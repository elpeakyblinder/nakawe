'use client';

import Image from "next/image";
import Link from "next/link";
import Masonry from 'react-masonry-css';
import { ArrowRight } from "lucide-react";

type Collection = {
    id: string;
    name: string;
    description: string;
    cover_image_url: string;
    artisan_name: string;
    product_count: number;
};

interface CollectionsGridProps {
    collections: Collection[];
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
    const breakpointColumnsObj = {
        default: 4,
        1600: 4,
        1280: 3,
        1024: 2,
        700: 1
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {collections.map((collection, index) => {
                const ringClass = (index + 1) % 2 === 0
                    ? 'ring-2 ring-[#EC489980]'
                    : '';

                return (
                    <div key={collection.id}>
                        <Link
                            href={`/colecciones/${collection.id}`}
                            className={`group block bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${ringClass}`}
                        >
                            <Image
                                src={collection.cover_image_url || '/default-cover-image.png'}
                                alt={`Portada de la colección ${collection.name}`}
                                width={500}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900">{collection.name}</h3>
                                <p className="mt-1 text-sm text-gray-600">Por: {collection.artisan_name}</p>
                                <p className="mt-3 text-gray-700 text-sm line-clamp-3">{collection.description}</p>
                                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                    <p className="font-bold text-[#EC4899]">{collection.product_count} Piezas</p>
                                    <div className="flex items-center text-sm font-bold text-gray-500 group-hover:text-[#000000] transition-colors duration-300">
                                        Explorar
                                        <ArrowRight size={20} className="ml-1 transition-opacity" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </Masonry>
    );
}