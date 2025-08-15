'use client';

import Image from "next/image";
import Link from "next/link";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./infColecciones.css";
import { type Product } from '@/types';

const ProductCardItem = ({ product, artisanName }: { product: Product, artisanName: string }) => {
    const productImageUrl = product.main_image_url || '/productoEjemplo.png';

    return (
        <div className="prendasCard card-fade-in" key={product.id}>
            <Image
                className="imagenPrenda"
                src={productImageUrl}
                alt={product.name}
                width={500}
                height={750}
            />
            <div className="cuerpoPrendasCard">
                <h2>{product.name}</h2>
                <p>{product.product_brief}</p>
                <div className="infoCuerpoPrendasCard">
                    <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15} />
                    <span>{artisanName}</span>
                </div>
                <div className="infoCuerpoPrendasCard">
                    <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15} />
                    <span>{product.production_time}</span>
                </div>
                <div className="prendasCardButtom">
                    <p>${product.price} MXN</p>
                    <Link href={`/producto/${product.id}`}>
                        <button className="verProductoBtn">Ver</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default function CollectionProductsGrid({ products = [], artisanName }: { products: Product[], artisanName: string }) {
    if (!products || products.length === 0) {
        return <p className="text-center text-gray-500">No hay productos en esta colección todavía.</p>;
    }

    return (
        <div className="prendas">
            <MasonryInfiniteGrid
                gap={30}
                align="center"
                useResizeObserver={true}
            >
                {products.map((product) => (
                    <ProductCardItem
                        key={product.id}
                        product={product}
                        artisanName={artisanName}
                        data-grid-groupkey={product.id}
                    />
                ))}
            </MasonryInfiniteGrid>
        </div>
    );
}