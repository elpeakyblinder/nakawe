import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./producto.css"; // Asegúrate de mover tu archivo producto.css a esta nueva carpeta
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

// Tipos de datos que esperamos de la API
type ProductDetails = {
  id: string;
  name: string;
  description: string;
  code: string;
  materials: string;
  price: number;
  main_image_url: string;
  artisan_name: string;
  production_time: string;
  origin: string;
  collection_id: string; // Se añade para poder buscar otros productos
};

type OtherProduct = {
  id: string;
  name: string;
  main_image_url: string;
  price: number;
  product_brief: string;
  production_time: string;
};

// Función para obtener los datos del producto principal
async function getProductDetails(id: string): Promise<ProductDetails | null> {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/products/${id}`
    // Asegúrate de que esta ruta exista o ajústala si es necesario
    : `http://localhost:3000/api/products/${id}`;
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
}

// Función actualizada para obtener otros productos de la misma colección
async function getOtherProducts(collectionId: string, currentProductId: string): Promise<OtherProduct[]> {
    const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/collections/${collectionId}?random=true&exclude=${currentProductId}`
    : `http://localhost:3000/api/collections/${collectionId}?random=true&exclude=${currentProductId}`;

    try {
        const res = await fetch(apiUrl, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Error de red al obtener otros productos:", error);
        return [];
    }
}

// CORRECCIÓN: Se ajusta la firma del componente para que 'params' sea una promesa.
export default async function ProductoPage({ params }: { params: Promise<{ productId: string }> }) {
  // Se espera la promesa para obtener el 'productId'.
  const { productId } = await params;
  const product = await getProductDetails(productId);

  if (!product) {
    notFound();
  }

  const otherProducts = await getOtherProducts(product.collection_id, product.id);

  return (
    <div className={`bodyProducto ${leagueSpartan.className}`}>
      <div className="productoPresentacion">
        <Image 
          className="imagenPrenda" 
          src={product.main_image_url || '/productoEjemplo.png'} 
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
                <Image src={'/iconos/time.svg'} alt="Time icon" width={20} height={20} />
                <span>Tiempo de elaboración</span>
              </div>
              <p>{product.production_time}</p>
            </div>
            <div className="detalleItem">
              <div>
                <Image src={'/iconos/location.svg'} alt="Location icon" width={20} height={20} />
                <span>Origen</span>
              </div>
              <p>{product.origin}</p>
            </div>
          </div>

          <div className="productoMaterial">
            <h6>MATERIAL: <span>SEDA</span></h6>
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
              const productImageUrl = otherProduct.main_image_url || '/productoEjemplo.png';
              return (
                <div key={otherProduct.id} className="prendasCard">
                  {productImageUrl.includes('placehold.co') ? (
                    <img className="imagenPrenda" src={productImageUrl} alt={otherProduct.name} />
                  ) : (
                    <Image className="imagenPrenda" src={productImageUrl} alt={otherProduct.name} width={100} height={250}/>
                  )}
                  <div className="cuerpoPrendasCard">
                    <h2>{otherProduct.name}</h2>
                    <p>{otherProduct.product_brief}</p>
                    <div className="infoCuerpoPrendasCard">
                      <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15}/>
                      <span>{product.artisan_name}</span>
                    </div>
                    <div className="infoCuerpoPrendasCard">
                      <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
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
