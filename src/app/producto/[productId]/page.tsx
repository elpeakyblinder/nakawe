import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./producto.module.css";
import { League_Spartan } from 'next/font/google';
import { fetchProductById, fetchRelatedProducts } from "@/lib/data";
import ProductActions from "@/components/features/products/ProductActions";
import { Clock, MapPin } from 'lucide-react';
import LinearGradient from "@/components/ui/LinearGradient";
import FavoriteToggleButton from "@/components/features/products/FavoriteToggleButton";
import FormattedPrice from "@/components/ui/FormattedPrice";
import CategoryBadge from "@/components/ui/CategoryBadge";

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

export default async function ProductoPage({ params }: { params: Promise<{ productId: string }> }) {
    // await params antes de usar
    const { productId } = await params;

    const product = await fetchProductById(productId);

    if (!product) notFound();

    const otherProducts = await fetchRelatedProducts(product.collection_id, product.id);
    const mainImageUrl = product.main_image_url ?? '/productoEjemplo.png';

    return (
        // 2. Combinar la clase del módulo con la clase de la fuente
        <div className={`${styles.bodyProducto} ${leagueSpartan.className}`}>
            <div className={styles.productoPresentacion}>
                <Image
                    // 'imagenPrenda' se mantiene como clase global
                    className="imagenPrenda"
                    src={mainImageUrl}
                    alt={product.name}
                    width={400}
                    height={550}
                />
                <div className={styles.productoInformacion}>
                    <div className={styles.divMiniTitulo}>
                        {/* 'headerMiniTitulo' se mantiene como clase global */}
                        <p className="headerMiniTitulo">{product.artisan_name}</p>
                        <FavoriteToggleButton product={product} />
                    </div>
                    <h1 className="text-2xl">{product.name}</h1>
                    <span>{product.code}</span>
                    <p>{product.description}</p>

                    <div className={styles.productoDetallesAdicionales}>
                        <div className={styles.detalleItem}>
                            <div>
                                <Clock size={20} className="imageIcons" />
                                <span>Tiempo de elaboración</span>
                            </div>
                            <p>{product.production_time}</p>
                        </div>
                        <div className={styles.detalleItem}>
                            <div>
                                <MapPin size={20} className="imageIcons" />
                                <span>Origen</span>
                            </div>
                            <p>{product.origin}</p>
                        </div>
                    </div>
                    <div className={styles.productCategory}>
                        <div>
                            <CategoryBadge categoryName={product.category} className="p-1 text-md px-5 whitespace-nowrap" />
                        </div>
                        <div className={styles.productoMaterial}>
                            <h6>MATERIAL:</h6>
                            <p>{product.materials}</p>
                        </div>
                    </div>
                    <ProductActions product={product} />
                </div>
            </div>

            {otherProducts.length > 0 && (
                <>
                    <div className={styles.descubrePrendas}>
                        <h2>OTRAS PRENDAS DE LA COLECCIÓN</h2>
                        <LinearGradient />
                    </div>
                    <div className={styles.prendas}>
                        {otherProducts.map(otherProduct => {
                            const relatedImageUrl = otherProduct.main_image_url ? otherProduct.main_image_url : '/productoEjemplo.png';
                            return (
                                <div key={otherProduct.id} className={styles.prendasCardProducto}>
                                    <Image className="imagenPrenda" src={relatedImageUrl} alt={otherProduct.name} width={100} height={250} />
                                    <div className={styles.cuerpoPrendasCard}>
                                        <h2>{otherProduct.name}</h2>
                                        <p>{otherProduct.product_brief}</p>
                                        <div className={styles.infoCuerpoPrendasCard}>
                                            <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15} />
                                            <span>{product.artisan_name}</span>
                                        </div>
                                        <div className={styles.infoCuerpoPrendasCard}>
                                            <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15} />
                                            <span>{otherProduct.production_time}</span>
                                        </div>
                                        <div className={styles.prendasCardButtom}>
                                            <FormattedPrice className="text-2xl font-medium text-[var(--color-principal-ui)]" amount={product.price} />
                                            <Link href={`/producto/${otherProduct.id}`}>
                                                <button>Ver</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}
