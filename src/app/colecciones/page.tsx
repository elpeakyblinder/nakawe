import Image from "next/image";
import CollectionsGrid from './collectionsGrid';
import { ArrowRight } from "lucide-react";
import LinearGradient from "@/components/ui/LinearGradient";
// 1. Importar los estilos desde el archivo .module.css
import styles from "./colecciones.module.css";
import { fetchCollections } from "@/lib/data";

export default async function ColeccionesPage() {
    const collections = await fetchCollections();

    return (
        <div>
            {/* 2. Aplicar la clase del módulo */}
            <header className={styles.headerColecciones}>
                {/* Las clases de Tailwind se mantienen como string */}
                <h1 className="text-5xl font-bold">COLECCIONES</h1>
                <p className="text-2xl font-light mt-4 mb-4">PRESERVANDO LA HISTORIA</p>
                <LinearGradient />
            </header>

            <main className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-12">
                <CollectionsGrid collections={collections} />
            </main>

            {/* Las siguientes clases provienen de globals.css y se mantienen como string */}
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
