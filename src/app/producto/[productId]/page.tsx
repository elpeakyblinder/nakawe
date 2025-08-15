import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./producto.css";
import { League_Spartan } from 'next/font/google';
import { fetchProductById, fetchRelatedProducts } from "@/lib/data";

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

interface ProductoPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductoPage({ params }: { params: Promise<{ productId: string }> }) {
  // await params antes de usar
  const { productId } = await params;

  const product = await fetchProductById(productId);

  if (!product) notFound();

  const otherProducts = await fetchRelatedProducts(product.collection_id, product.id);

  const mainImageUrl = product.main_image_url ?? '/productoEjemplo.png';

  return (
    <div className={`bodyProducto ${leagueSpartan.className}`}>
      <div className="productoPresentacion">
        <Image
          className="imagenPrenda"
          src={mainImageUrl}
          alt={product.name}
          width={400}
          height={550}
        />
        <div className="productoInformacion">
          <div className="divMiniTitulo">
            <p className="headerMiniTitulo">{product.artisan_name}</p>
          </div>
          <h1>{product.name}</h1>
          <span>{product.code}</span>
          <p>{product.description}</p>

          <div className="productoDetallesAdicionales">
            <div className="detalleItem">
              <div>
                <Image className="imageIcons" src={'/iconos/time.svg'} alt="Time icon" width={20} height={20} />
                <span>Tiempo de elaboración</span>
              </div>
              <p>{product.production_time}</p>
            </div>
            <div className="detalleItem">
              <div>
                <Image className="imageIcons" src={'/iconos/location.svg'} alt="Location icon" width={20} height={20} />
                <span>Origen</span>
              </div>
              <p>{product.origin}</p>
            </div>
          </div>

          <div className="productoMaterial">
            <h6>MATERIAL:</h6>
            <p>{product.materials}</p>
          </div>
          <div className="productoPrecio">
            <span>${product.price} MXN</span>
            <button>Añadir al carrito</button>
          </div>
        </div>
      </div>

      {otherProducts.length > 0 && (
        <>
          <div className="descubrePrendas">
            <h2>OTRAS PRENDAS DE LA COLECCIÓN</h2>
            <div className="barraPrendas"></div>
          </div>
          <div className="prendas">
            {otherProducts.map(otherProduct => {
              const relatedImageUrl = otherProduct.main_image_url ? otherProduct.main_image_url : '/productoEjemplo.png';
              return (
                <div key={otherProduct.id} className="prendasCardProducto">
                  <Image className="imagenPrenda" src={relatedImageUrl} alt={otherProduct.name} width={100} height={250} />
                  <div className="cuerpoPrendasCard">
                    <h2>{otherProduct.name}</h2>
                    <p>{otherProduct.product_brief}</p>
                    <div className="infoCuerpoPrendasCard">
                      <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15} />
                      <span>{product.artisan_name}</span>
                    </div>
                    <div className="infoCuerpoPrendasCard">
                      <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15} />
                      <span>{otherProduct.production_time}</span>
                    </div>
                    <div className="prendasCardButtom">
                      <p>${otherProduct.price} MXN</p>
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