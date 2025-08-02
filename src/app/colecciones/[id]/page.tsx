import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "./infColecciones.css"; // Puedes reutilizar tu CSS
import { League_Spartan } from 'next/font/google';

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

// Definimos los tipos de datos que esperamos de la API
type Product = {
  id: string;
  name: string;
  product_brief: string;
  artisan_id: string; // Asumiendo que tienes estos datos
  production_time: string;
  price: number;
  image_url: string; // Asumiendo que tienes una URL de imagen
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

// Función para obtener los datos de la API
async function getCollectionDetails(id: string): Promise<CollectionDetails | null> {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/collections/${id}`
    : `http://localhost:3000/api/collections/${id}`;
  
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error de red:", error);
    return null;
  }
}

// Esta es la página. Recibe 'params' con el ID de la colección.
type PageProps = {
  params: { id: string }
}
export default async function InformacionColeccionesPage({ params }: PageProps) {
  const collection = await getCollectionDetails(params.id);

  // Si la colección no se encuentra, muestra la página 404 de Next.js
  if (!collection) {
    notFound();
  }

  return (
    <div className={leagueSpartan.className}>
      <section className="productosSection">
        <div className="presentacionProducto">
          <div className="presentacionColeccionesImagen">
            <div className="mainPresentacionColecciones">
              <div className="mainPresentacionColeccionesTitulo">
                <h3>{collection.artisan_name}</h3>
                <div>
                  <p><strong>SHOWROOM</strong></p>
                  <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={100}/>
                </div>
              </div>
              <p>{collection.name.toUpperCase()}</p>
              <div className="presentacionColeccionesFinal">
                <p className="textoRosa"><strong>{collection.products.length} Piezas únicas</strong></p>
              </div>
            </div>
          </div>
          <div className="presentacionProductoInfo">
            <h2 className="titulo">{collection.name}</h2>
            <p>{collection.description}</p>
            <Image src={collection.cover_image_url || '/coleccionesEjemplo.png'} alt="Ejemplo" width={400} height={200}/>
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
              <h2 className="textoMediano">HISTORIA DEL DISEÑO</h2>
              <p>{collection.design_history}</p>
            </div>
            <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
          </div>
        </div>

        <div className="descubrePrendas">
          <h2>DESCUBRE LAS PRENDAS</h2>
          <div className="barraPrendas"></div>
        </div>

        <div className="prendas">
          {collection.products.map((product) => (
            <div key={product.id} className="prendasCard">
              <Image className="imagenPrenda" src={product.image_url || '/productoEjemplo.png'} alt={product.name} width={100} height={250}/>
              <div className="cuerpoPrendasCard">
                <h2>{product.name}</h2>
                <p>{product.product_brief}</p>
                <div className="infoCuerpoPrendasCard">
                  <Image src={'/iconos/user.svg'} alt="Icono usuario" width={15} height={15}/>
                  <span>{collection.artisan_name}</span>
                </div>
                <div className="infoCuerpoPrendasCard">
                  <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
                  <span>{product.production_time}</span>
                </div>
                <div className="prendasCardButtom">
                  <p>${product.price} MXN</p>
                    <button><Link href={`/producto/${product.id}`}>Ver</Link></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
