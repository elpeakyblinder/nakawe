import Image from "next/image";
import { notFound } from "next/navigation";
import { League_Spartan } from 'next/font/google';
import { fetchCollectionById } from '@/lib/data';
import CollectionProductsGrid from './CollectionProductsGrid';
import LinearGradient from "@/components/ui/LinearGradient";
import "./infColecciones.css";

const leagueSpartan = League_Spartan({ subsets: ['latin'] });

export default async function InformacionColeccionesPage({
  params,
}: { params: { id: string } }) {
  const { id } = params;
  const collection = await fetchCollectionById(id);

  if (!collection) {
    notFound();
  }

  const coverImageUrl = collection.cover_image_url || '/coleccionesEjemplo.png';

  return (
    <div className={leagueSpartan.className}>
      <section className="productosSection">
        {/* Toda la información de la colección se renderiza en el servidor */}
        <div className="presentacionProducto">
          <div className="presentacionColeccionesImagen">
            <Image
              src={coverImageUrl}
              alt={`Imagen principal de la colección ${collection.name}`}
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
            />
            <div className="mainPresentacionColecciones">
              <div className="mainPresentacionColeccionesTitulo">
                <h3>{collection.artisan_name}</h3>
                <div>
                  <p><strong>SHOWROOM</strong></p>
                  <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={30} />
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
            <Image src={coverImageUrl} alt="Ejemplo" width={400} height={200} style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="cuerpoProducto">
          <div className="mercadoDeAlcance">
            <div>
              <h3 className="textoMediano">MERCADO DE ALCANCE</h3>
              <p>{collection.target_market}</p>
            </div>
            <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200} />
          </div>
          <div className="conceptoDiseño">
            <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200} />
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
            <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200} />
          </div>
        </div>

        <div className="descubrePrendas">
          <h2>DESCUBRE LAS PRENDAS</h2>
          <LinearGradient />
        </div>


        <CollectionProductsGrid products={collection.products} artisanName={collection.artisan_name} />
      </section>
    </div>
  )
}