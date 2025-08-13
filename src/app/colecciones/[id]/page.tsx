"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import "./infColecciones.css";
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

// --- TIPOS DE DATOS (Sin cambios) ---
type Product = {
  id: string;
  name: string;
  product_brief: string;
  artisan_id: string;
  production_time: string;
  price: number;
  image_url: string;
};

type CollectionDetails = {
  id: string;
  name: string;
  description: string;
  target_market: string;
  design_concept: string;
  design_history: string;
  cover_image_url: string;
  artisan_name: string;
  products: Product[];
};

// --- COMPONENTE PARA CADA TARJETA DE PRODUCTO ---
// Este componente interno maneja la carga de su propia imagen y su animación.
const ProductCardItem = ({ product, artisanName }: { product: Product, artisanName: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const productImageUrl = product.image_url || '/productoEjemplo.png';

  return (
    <div className="prendasCard card-fade-in" key={product.id}>
      <div className="imagenPrendaContainer">
        {!isImageLoaded && <div className="skeleton-image"></div>}
        <img 
          className="imagenPrenda" 
          src={productImageUrl} 
          alt={product.name}
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? 'block' : 'none' }}
        />
      </div>
      <div className="cuerpoPrendasCard">
        <h2>{product.name}</h2>
        <p>{product.product_brief}</p>
        <div className="infoCuerpoPrendasCard">
          <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15}/>
          <span>{artisanName}</span>
        </div>
        <div className="infoCuerpoPrendasCard">
          <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
          <span>{product.production_time}</span>
        </div>
        <div className="prendasCardButtom">
          <p>${product.price} MXN</p>
          <Link href={`/producto/${product.id}`}>
            <button>Ver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function InformacionColeccionesPage() {
  const params = useParams();
  const id = params.id as string;
  const [collection, setCollection] = useState<CollectionDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getCollectionDetails = async () => {
      setLoading(true);
      const apiUrl = `/api/collections/${id}`;
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          notFound();
          return;
        }
        const data = await res.json();
        setCollection(data);
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };
    getCollectionDetails();
  }, [id]);

  if (loading) {
    return <div style={{textAlign: 'center', padding: '50px'}}>Cargando colección...</div>;
  }

  if (!collection) {
    return <div style={{textAlign: 'center', padding: '50px'}}>Colección no encontrada.</div>;
  }

  const coverImageUrl = collection.cover_image_url || '/coleccionesEjemplo.png';

  return (
    <div className={leagueSpartan.className}>
      <section className="productosSection">
        {/* --- SECCIÓN DE PRESENTACIÓN (Sin cambios) --- */}
        <div className="presentacionProducto">
          <div className="presentacionColeccionesImagen">
            <Image
              src={'/showRoomNitaSanchez.jpeg'}
              alt={collection.name}
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
            />
            <div className="mainPresentacionColecciones">
              <div className="mainPresentacionColeccionesTitulo">
                <h3>{collection.artisan_name}</h3>
                <div>
                  <p><strong>SHOWROOM</strong></p>
                  <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={30}/>
                </div>
              </div>
              <p>{collection.design_history}</p>
              <div className="presentacionColeccionesFinal">
                <p className="textoRosa"><strong>{collection.products.length} Piezas únicas</strong></p>
              </div>
            </div>
          </div>
          <div className="presentacionProductoInfo">
            <h2 className="titulo">{collection.name}</h2>
            <p>{collection.description}</p>
            {coverImageUrl.includes('placehold.co') ? (
              <img src={coverImageUrl} alt="Ejemplo" width={400} height={200} style={{ objectFit: 'cover' }}/>
            ) : (
              <Image src={coverImageUrl} alt="Ejemplo" width={400} height={200} style={{ objectFit: 'cover' }}/>
            )}
          </div>
        </div>
        <div className="cuerpoProducto">
          <div className="mercadoDeAlcance">
            <div>
              <h3 className="textoMediano">MERCADO DE ALCANCE</h3>
              <p>{collection.target_market}</p>
            </div>
            <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
          </div>
          <div className="conceptoDiseño">
              <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
            <div>
              <h3 className="textoMediano">CONCEPTO DEL DISEÑO</h3>
              <p>{collection.design_concept}</p>
            </div>
          </div>
          <div className="historiaDelDiseño">
            <div>
              <h3 className="textoMediano">HISTORIA DEL DISEÑO</h3>
              <p>{collection.design_history}</p>
            </div>
              <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
          </div>
        </div>

        <div className="descubrePrendas">
          <h2>DESCUBRE LAS PRENDAS</h2>
          <div className="barraPrendas"></div>
        </div>

        {/* --- SECCIÓN DE LA CUADRÍCULA MEJORADA --- */}
        <div className="prendas">
          <MasonryInfiniteGrid
            gap={30}
            align="center"
            // Esta opción hace que la cuadrícula se reajuste si el tamaño del navegador cambia.
            useResizeObserver={true}
            // Define una duración para la animación de posicionamiento de las tarjetas.
            transitionDuration={0.3}
          >
            {collection.products.map((product) => (
              <ProductCardItem 
                key={product.id}
                product={product} 
                artisanName={collection.artisan_name} 
                // data-grid-groupkey es útil para que la librería optimice el renderizado.
                data-grid-groupkey={product.id}
              />
            ))}
          </MasonryInfiniteGrid>
        </div>
      </section>
    </div>
  )
}
