'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import "./infColecciones.css";
import { League_Spartan } from 'next/font/google'
const leagueSpartan = League_Spartan({ subsets: ['latin'] })


export default function InformacionColecciones(){
    const router = useRouter(); //ESTO SE VA A ELIMINAR, ES SOLO PARA REDIRECCIONAR A LA SIGUIENTE PAGINA 
    const irAProducto = () => { //NI SE SI NEXT JS 14 USA ESTE ROUTER
            router.push('/colecciones/informacion-colecciones/producto');
    }; //HASTA AQUI SE ELIMINARIA
    return(
    <html lang="en">
      <body className="{leagueSpartan.className}">
            <section className="productosSection">
                <div className="presentacionProducto">

                    <div className="presentacionColeccionesImagen">
                        <div className="mainPresentacionColecciones">
                            <div className="mainPresentacionColeccionesTitulo">
                                <h3>Nita Sánchez</h3>
                                <div>
                                    <p><strong>SHOWROOM</strong></p>
                                    <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={100}/>
                                </div>
                            </div>
                            <p>MUCTAHUITZ, MUNICIPIO LARRAIZAR, CHIAPAS.</p>

                            <div className="presentacionColeccionesFinal">
                                <p className="textoRosa"><strong>24 Piezas únicas</strong></p>
                                <button><strong>Explora</strong></button>
                            </div>
                        </div>
                    </div>

                    <div className="presentacionProductoInfo">
                        <h2 className="titulo">TEJIENDO HISTORIAS</h2>
                        <p>Esta serie de prendas de la marca no es una colección per se, es una muestra de la estética de su universo: para crear mis piezas el proceso es sensorial, imagino la silueta como una imagen en mi cabeza, y al mismo tiempo exploro la sensación de cómo se va a sentir la textura de la tela, la caída, el volumen. Es muy importante para mí que la función de la prenda se mantenga, para que permita movimiento y libertad, que son valores reales para mí como persona.</p>
                        <Image src={'/coleccionesEjemplo.png'} alt="Ejemplo" width={400} height={200}/>
                    </div>

                </div>

                <div className="cuerpoProducto">
                    <div className="mercadoDeAlcance">
                        <div>
                            <h3 className="textoMediano">MERCADO DE ALCANCE</h3>
                            <p>Pensada para un público que busca prendas unisex, versátiles y con diseño contemporáneo. Ideal para concept stores, marcas de moda independiente y clientes que valoran la elegancia minimalista con detalles únicos para el uso diario.</p>
                        </div>
                        <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
                    </div>

                    <div className="conceptoDiseño">
                        <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
                        <div>
                            <h3 className="textoMediano">CONCEPTO DEL DISEÑO</h3>
                            <p>Camisa unisex basada en la geometría del rectángulo, que equilibra elegancia y comodidad. El contraste de color y los sutiles pliegues, cortes y aberturas transforman una forma simple en una prenda contemporánea y expresiva.</p>
                        </div>
                    </div>

                    <div className="historiaDelDiseño">
                        <div>
                            <h2 className="textoMediano">HISTORIA DEL DISEÑO</h2>
                            <p>El diseño parte de una intuición visual y táctil: imaginar la silueta en movimiento y sentir cómo se comporta la tela sobre el cuerpo. Cada pieza nace de la búsqueda por equilibrar estética y funcionalidad, con formas que permiten libertad, fluidez y conexión sensorial con quien la viste.</p>
                        </div>
                        <Image src={'/coleccionesEjemplo.png'} alt="Tipo de coleccion" width={300} height={200}/>
                    </div>
                </div>

                <div className="descubrePrendas">
                    <h2>DESCRUBRE LAS PRENDAS</h2>
                    <div className="barraPrendas"></div>
                </div>

                <div className="prendas">
                    <div className="prendasCard">
                        <Image className="imagenPrenda" src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={100} height={250}/>

                        <div className="cuerpoPrendasCard">
                            <h2>CAMISETA RECTÁNGULO ALTO CONTRASTE</h2>
                            <p>Esta camisa unisex inspirada en la geometría simple de un rectángulo</p>

                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/user.svg'} alt="Icono ubicacion" width={15} height={15}/>
                                <span>Nita Sánchez</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
                                <span>14hrs</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/location.svg'} alt="Icono usuario" width={15} height={15}/>
                                <span>Larráinzar, Chiapas</span>
                            </div>

                            <div className="prendasCardButtom">
                                <p>$3060MXN</p>
                                <button onClick={irAProducto}>Ver</button>
                            </div>
                        </div>
                    </div>
                    <div className="prendasCard">
                        <Image className="imagenPrenda" src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={100} height={250}/>

                        <div className="cuerpoPrendasCard">
                            <h2>CAMISETA RECTÁNGULO ALTO CONTRASTE</h2>
                            <p>Esta camisa unisex inspirada en la geometría simple de un rectángulo</p>

                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/user.svg'} alt="Icono ubicacion" width={15} height={15}/>
                                <span>Nita Sánchez</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
                                <span>14hrs</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/location.svg'} alt="Icono usuario" width={15} height={15}/>
                                <span>Larráinzar, Chiapas</span>
                            </div>

                            <div className="prendasCardButtom">
                                <p>$3060MXN</p>
                                <button onClick={irAProducto}>Ver</button>
                            </div>
                        </div>
                    </div>
                    <div className="prendasCard">
                        <Image className="imagenPrenda" src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={100} height={250}/>

                        <div className="cuerpoPrendasCard">
                            <h2>CAMISETA RECTÁNGULO ALTO CONTRASTE</h2>
                            <p>Esta camisa unisex inspirada en la geometría simple de un rectángulo</p>

                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/user.svg'} alt="Icono ubicacion" width={15} height={15}/>
                                <span>Nita Sánchez</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/time.svg'} alt="Icono tiempo" width={15} height={15}/>
                                <span>14hrs</span>
                            </div>
                            <div className="infoCuerpoPrendasCard">
                                <Image src={'/iconos/location.svg'} alt="Icono usuario" width={15} height={15}/>
                                <span>Larráinzar, Chiapas</span>
                            </div>

                            <div className="prendasCardButtom">
                                <p>$3060MXN</p>
                                <button onClick={irAProducto}>Ver</button>
                            </div>
                        </div>
                    </div>
                    

                </div>

            </section>
        </body>
    </html>
    )
}