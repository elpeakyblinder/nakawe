'use client';
import "./colecciones.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { League_Spartan } from 'next/font/google'
const leagueSpartan = League_Spartan({ subsets: ['latin'] })

export default function Colecciones() {

  const router = useRouter(); //ESTO SE VA A ELIMINAR, ES SOLO PARA REDIRECCIONAR A LA SIGUIENTE PAGINA 
    const irAInformacion = () => { //NI SE SI NEXT JS 14 USA ESTE ROUTER
    router.push('/colecciones/informacion-colecciones');
  }; //HASTA AQUI SE ELIMINARIA
 
  return (
    <html>
      <body className="{leagueSpartan.className}">
        <header>
          <h1>COLECCIONES</h1>
          <p>PRESERVANDO LA HISTORIA</p>

          <div className="barraHeaderColecciones"></div>
        </header>

      <div className="cardsColecciones">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="presentacionColeccionesMain">
            <div className="mainPresentacionColecciones">
              <div className="mainPresentacionColeccionesTitulo">
                <h3>Nita Sánchez</h3>
                <div>
                  <p><strong>SHOWROOM</strong></p>
                  <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={30} />
                </div>
              </div>
              <p>MUCTAHUITZ, MUNICIPIO LARRAIZAR, CHIAPAS.</p>

              <div className="presentacionColeccionesFinal">
                <p className="textoRosa"><strong>24 Piezas únicas</strong></p>
                <button onClick={irAInformacion}><strong>Explora</strong></button>
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


      </body>
    </html>
  )
}