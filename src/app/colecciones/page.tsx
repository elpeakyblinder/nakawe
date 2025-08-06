import "./colecciones.css";
import Image from "next/image";
import Link from "next/link"; // Se usa Link para una navegación optimizada.
import { League_Spartan } from 'next/font/google'

const leagueSpartan = League_Spartan({ subsets: ['latin'] })

// Se define un tipo para los datos que se recibirán de la API.
type Collection = {
  id: string;
  name: string;
  description: string;
  design_history: string,
  cover_image_url: string;
  artisan_name: string;
  product_count: number;
}

// Función para obtener los datos de las colecciones desde la API.
async function getCollections(): Promise<Collection[]> {
  // Construimos la URL completa para que funcione en el servidor.
  const apiUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/api/collections` 
    : 'http://localhost:3000/api/collections';
  
  try {
    const res = await fetch(apiUrl, {
      cache: 'no-store', // Se evita el caché para obtener siempre los datos más recientes.
    });

    if (!res.ok) {
      console.error("Error al obtener las colecciones:", await res.text());
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error de red:", error);
    return [];
  }
}

// La página ahora es un componente 'async' para poder usar 'await'.
export default async function Colecciones() {
  const collections = await getCollections();

  return (
    // Se eliminan las etiquetas <html> y <body>, ya que Next.js las maneja en el layout.
    <div className={leagueSpartan.className}>
      <header>
        <h1>COLECCIONES</h1>
        <p>PRESERVANDO LA HISTORIA</p>
        <div className="barraHeaderColecciones"></div>
      </header>

      <div className="cardsColecciones">
        {collections.map((collection) => (
          <div key={collection.id} className="presentacionColeccionesMain">
            {/* 1. Se añade el componente <Image> con la prop 'fill' para que actúe como fondo */}
            <Image
              src={'/showRoomNitaSanchez.jpeg'}
              alt={collection.name}
              fill
              style={{ objectFit: 'cover', zIndex: 1 }}
            />
            {/* 2. El contenido de la tarjeta ahora se superpone a la imagen */}
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
                <p className="textoRosa"><strong>{collection.product_count} Piezas únicas</strong></p>
                <Link href={`/colecciones/${collection.id}`}>
                  <button><strong>Explora</strong></button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="invitacionDeColaboracion">
        <h4>Cada Compra es un Acto de Resistencia Cultural</h4>
        <p className="textoMediano">Al adquirir nuestras piezas, no solo llevas arte a tu hogar, sino que contribuyes directamente al sustento de las familias artesanas y a la preservación de tradiciones milenarias.</p>
        <div className="colaboracionArtesanas">
          <Image src={'/flechaBlancaConCirculo.svg'} alt="flecha" width={50} height={50} />
          <Image className="colaboracionArtesanasImagen" src={'/artesanaprofile.png'} alt="Artesana imagen" width={180} height={180} />
          <Image className="colaboracionArtesanasImagen" src={'/artesanaprofile.png'} alt="Artesana imagen" width={180} height={180} />
          <Image className="colaboracionArtesanasImagen" src={'/artesanaprofile.png'} alt="Artesana imagen" width={180} height={180} />
          <Image src={'/flechaBlancaConCirculo.svg'} alt="flecha" width={50} height={50} />
        </div>
        <button className="invitacionDeColaboracionButton2">Conocer a las Maestras Artesanas<Image src={'/flechaBlanca.svg'} alt="flecha" width={20} height={20}/></button>
        <p></p>
      </div>
    </div>
  )
}
