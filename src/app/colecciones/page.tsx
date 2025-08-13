import Image from "next/image";
import CollectionsGrid from './collectionsGrid';
import { ArrowRight } from "lucide-react";
import LinearGradient from "@/components/ui/LinearGradient";


// Definimos el tipo de dato para una colección
type Collection = {
  id: string;
  name: string;
  description: string;
  design_history: string,
  cover_image_url: string;
  artisan_name: string;
  product_count: number;
};

// Función para obtener los datos de las colecciones desde la API en el servidor
async function getCollections(): Promise<Collection[]> {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/collections`
    : 'http://localhost:3000/api/collections';

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
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

// La página principal ahora es un Componente de Servidor
export default async function ColeccionesPage() {
  // 1. Obtenemos los datos en el servidor
  const collections = await getCollections();

  return (
    <div>
      <header className="flex flex-col items-center justify-center h-[40vh] bg-[#060606] text-white">
        <h1 className="text-5xl font-bold">COLECCIONES</h1>
        <p className="text-3xl font-light mt-4 mb-4">PRESERVANDO LA HISTORIA</p>
        <LinearGradient />
      </header>

      <main className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-12">
        <CollectionsGrid collections={collections} />
      </main>

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
        <button className="invitacionDeColaboracionButton2">Conocer a las Maestras Artesanas <ArrowRight size={20} /></button>
        <p></p>
      </div>
    </div>
  );
}