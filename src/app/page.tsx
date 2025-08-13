'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { League_Spartan } from 'next/font/google'
const leagueSpartan = League_Spartan({ subsets: ['latin'] })
import LinearGradient from "@/components/ui/LinearGradient";


interface CounterProps {
  target: number;
  label: string;
}
const Counter: React.FC<CounterProps> = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 4000; // duración total en ms
    const stepTime = 50; // tiempo entre cada incremento
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div>
      <h2>{count}+</h2>
      <p>{label}</p>
    </div>
  );
};

export default function Home() {
  return (
    <div className={`inicioPrincipal`}>
      {/* SECCION DEL HEADER */}
      <section className="header">
        <div className="headerParte1">
          <div>
            <p className="headerMiniTitulo">COMUNIDAD REGENERATIVA SIN FINES DE LUCRO</p>
          </div>
  
          <h1 className="headerTituloMobile">Y CON HISTORIAS TEJER LAS CONSCIENCIAS</h1>
          <div className="headerTitulo">
            <h1>Y CON HISTORIAS</h1>
            <h1>TEJER</h1>
            <h1>LAS</h1>
            <h1>CONSCIENCIAS</h1>
          </div>
  
          <p className="espaciadoDeTexto">Conectamos tradiciones ancestrales con innovación sostenible para crear un futuro regenerativo</p>
  
          <p className="textoRosa"><strong>NakaWé - Madre de la Tierra</strong></p>
  
          <div className="headerButtons">
            <button className="headerButton1">Ver Galeria</button>
            <button className="headerButton2">Ver Catalogos</button>
            <button className="headerButton3">Contribuye</button>
          </div>
        </div>
  
        <Image className="imagenHeader" src="/montañasPrincipal.png" alt="Montañas" width={400} height={650}/>
      </section>

      <div className="conocenos">
        <Image src="/montañasPrincipal.png" alt="Logo Nakawe" width={400} height={250}/>

        <div className="conocenosBody">
          <h3>¿Quienes somos?</h3>
          <p className="espaciadoDeTexto">Buscamos agregar valor y consciencia a la cadena productiva industrial diseño, textil, agrícola y de la moda para un mundo sostenible.</p>
          <button><strong>CONOCE NUESTRA HISTORIA</strong> <ArrowRight className="imageArrowRight" size={25} /></button>
        </div>
      </div>


      {/* SECCION DE CONTADORES */}
      
      <div className="contadoresContainer">
        <Counter target={15} label="Comunidades" />
        <Counter target={200} label="Artesanos" />
        <Counter target={50} label="Talleres" />
        <Counter target={7} label="Años" />
      </div>

    {/* SECCION DE EVENTOS   */}

      <div className="eventos">
        <h2>Próximos Eventos</h2>
        <LinearGradient />

        <p>Del 23 al 25 de Mayo</p> {/*¿¿¿Será mejor eliminarlo??? */}
        <p>San Cristóbal de las Casas</p>
        
        <div className="cardsEvents">
          <Image className="imageArrowLeft" src={'/flechaBlancaConCirculo.svg'} width={50} height={50} alt="Arrow left"/>

          <div className="cardEvent cardEvent1">
            <div className="cardEventTop">
              <div className="cardEventFecha">
                <p className="cardEventDia">23</p>

                <div className="cardEventFechaSecundaria">
                  <p>Viernes</p>
                  <p>MAYO 2024</p>
                </div>
              </div>

              <div className="cardEventTipoEventoo">
                <Image src={'/flechaBlanca.svg'} alt="Icono de tipo de evento" width={20} height={20}/>
                <p className="textoBlancoOpaco">Taller</p>
              </div>

            </div>

            <Image  src={'/artesanoSustituto.png'} alt="Imagen del evento" width={200} height={200}/>

            <h4>Cena de recaudación</h4>
            <p className="textoBlancoSemiOpaco">Encuentro gastronómico con música y subastas</p>
            <button>Asistir</button>
          </div>


          <div className="cardEvent cardEvent1">
            <div className="cardEventTop">
              <div className="cardEventFecha">
                <p className="cardEventDia">23</p>

                <div className="cardEventFechaSecundaria">
                  <p>Viernes</p>
                  <p>MAYO 2024</p>
                </div>
              </div>
              <div className="cardEventTipoEventoo">
                <Image src={'/flechaBlanca.svg'} alt="Icono de tipo de evento" width={20} height={20}/>
                <p className="textoBlancoOpaco">Taller</p>
              </div>

            </div>

            <Image  src={'/artesanoSustituto.png'} alt="Imagen del evento" width={200} height={200}/>

            <h4>Cena de recaudación</h4>
            <p className="textoBlancoSemiOpaco">Encuentro gastronómico con música y subastas</p>
            <button>Asistir</button>
          </div>


          <div className="cardEvent cardEvent1">
            <div className="cardEventTop">
              <div className="cardEventFecha">
                <p className="cardEventDia">23</p>

                <div className="cardEventFechaSecundaria">
                  <p>Viernes</p>
                  <p>MAYO 2024</p>
                </div>
              </div>

              <div className="cardEventTipoEventoo">
                <Image src={'/flechaBlanca.svg'} alt="Icono de tipo de evento" width={20} height={20}/>
                <p className="textoBlancoOpaco">Taller</p>
              </div>

            </div>

            <Image  src={'/artesanoSustituto.png'} alt="Imagen del evento" width={200} height={200}/>

            <h4>Cena de recaudación</h4>
            <p className="textoBlancoSemiOpaco">Encuentro gastronómico con música y subastas</p>
            <button>Asistir</button>
          </div>


          <Image className="imageArrowRight" src={'/flechaBlancaConCirculo.svg'} width={50} height={50} alt="Arrow right"/>
        </div>
      </div>


{/* SECCION DE COLECCIONESSS */}
      <div className="colecciones"> {/*Seccion de colecciones*/}
        <h2>Colecciones</h2>
        <div className="barraDecorativaColecciones"></div>
        <p className="textoMediano textoColecciones">Cada pieza cuenta una historia, cada colección preserva una tradición</p>

        <div className="presentacionColecciones"> {/*Seccion principal de colecciones, imagen y descripcion */}
          <div className="coleccionesZonaTop">
            <div className="presentacionColeccionesImagen">
              <div className="mainPresentacionColecciones">
                <div className="mainPresentacionColeccionesTitulo">
                  <h3>Nita Sánchez</h3>
                  <div>
                    <p><strong>SHOWROOM</strong></p>
                    <Image src={'/pattern.png'} alt="Tipo de coleccion" width={30} height={30}/>
                  </div>
                </div>
                <p>MUCTAHUITZ, MUNICIPIO LARRAIZAR, CHIAPAS.</p>

                <div className="presentacionColeccionesFinal">
                  <p className="textoRosa"><strong>24 Piezas únicas</strong></p>
                  <button><strong>Explora</strong></button>
                </div>
              </div>
            </div>

            <div className="coleccionesInfo">
              <h2>Tradición que vive</h2>
              <p className="textoMediano espaciadoDeTexto">Cada hilo cuenta una historia ancestral. Nuestras colecciones preservan técnicas milenarias mientras crean oportunidades económicas para las comunidades artesanas.</p>
              <ul className="coleccionesInfoLista">
                <li typeof="disc">Técnicas ancestrales preservadas</li>
                <li typeof="disc">Comercio justo y sostenible</li>
                <li typeof="disc">Piezas únicas y auténticas</li>
              </ul>
              <button>EXPLORAR MAS COLECCIONES</button>
            </div>
          </div>



          <div className="coleccionesCards">
            <div className="coleccionCard">
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <div className="coleccionCardBody">
                <h5>Textiles</h5>
                <p>Huipiles, rebozos y bordados</p>
                <div className="coleccionCardButtom">
                  <span className="textoRosa">24 Productos</span>
                  <button><ArrowRight size={25} /></button>
                </div>
              </div>
            </div>


            <div className="coleccionCard">
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <div className="coleccionCardBody">
                <h5>Barro</h5>
                <p>Ollas, jarros y vajillas</p>
                <div className="coleccionCardButtom">
                  <span className="textoRosa">24 Productos</span>
                  <button><ArrowRight size={25} /></button>
                </div>
              </div>
            </div>


            <div className="coleccionCard">
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <div className="coleccionCardBody">
                <h5>Bordados</h5>
                <p>Blusas, manteles y decoración</p>
                <div className="coleccionCardButtom">
                  <span className="textoRosa">24 Productos</span>
                  <button><ArrowRight size={25} /></button>
                </div>
              </div>
            </div>


            <div className="coleccionCard">
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <div className="coleccionCardBody">
                <h5>Decoración y joyería</h5>
                <p>Collares, aretes y pulseras</p>
                <div className="coleccionCardButtom">
                  <span className="textoRosa">24 Productos</span>
                  <button><ArrowRight size={25} /></button>
                </div>
              </div>
            </div>

          </div>

        </div>
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

        <button className="invitacionDeColaboracionButton2">Conocer a las Maestras Artesanas<ArrowRight size={20} /></button>

        <p></p>
      </div>



      {/* SECCION DE REVISTA NAKAWE */}
      

      <div className="revistaNakawe">
        <h2>Revista NakaWé</h2>
        <h4 className="textoRosa">Historias e investigaciones sobre los proyectos</h4>

        <div className="revistaNakaweCards">

          <button className="arrowImageRevista"><Image className="imageArrowLeft" src={'/flechaNegraConCirculo.svg'} alt="arrow icon" width={40} height={40} /></button>

          <div className="revistaNakaweCard">
            <Image className="revistaNakaweCardImage" src={'/pattern.png'} height={140} width={150} alt="Pattern image"/>
            <div className="revistaNakaweCardBody">
              <h5>Bordado de palma por: </h5>
              <p>Exploramos cómo las tradiciones textiles conectan generaciones y preservan la memoria cultural.</p>
              <button><strong>Leer mas</strong><Image src={'/flechaNegra.svg'} alt="arrow icon" width={20} height={20} /></button>
            </div>
          </div>

          <div className="revistaNakaweCard">
            <Image className="revistaNakaweCardImage" src={'/pattern.png'} height={140} width={150} alt="Pattern image"/>
            <div className="revistaNakaweCardBody">
              <h5>Palomas de barro por: Desconocido</h5>
              <p>Exploramos cómo las tradiciones textiles conectan generaciones y preservan la memoria cultural.</p>
              <button><strong>Leer mas</strong><Image src={'/flechaNegra.svg'} alt="arrow icon" width={20} height={20} /></button>
            </div>
          </div>

          <div className="revistaNakaweCard">
            <Image className="revistaNakaweCardImage" src={'/pattern.png'} height={140} width={150} alt="Pattern image"/>
            <div className="revistaNakaweCardBody">
              <h5>Cine: Origen de la cultura tal</h5>
              <p>Exploramos cómo las tradiciones textiles conectan generaciones y preservan la memoria cultural.</p>
              <button><strong>Leer mas</strong><Image src={'/flechaNegra.svg'} alt="arrow icon" width={20} height={20} /></button>
            </div>
          </div>

          <button className="arrowImageRevista"><Image src={'/flechaNegraConCirculo.svg'} alt="arrow icon" width={40} height={40} /></button>
        </div>
      </div>

      {/* SECCION DE NUESTRO OBJETIVO */}
      <div className="nuestroObjetivo">
        <div className="nuestroObjetivoTitulo">
          <h2>Nuestro objetivo</h2>
          <LinearGradient/>
        </div>
        <p>Crear encuentros para reunir beneficios ambientales y sociales, tejiendo consciencia a través de historias compartidas y tradiciones preservadas.</p>
        <button>Conocer más sobre nosotros<Image src={'/flechaBlanca.svg'} alt="arrow icon" width={15} height={15} /></button>
      </div>


      {/* SECCION DE IMPACTO */}
      <div className="impacto">
        <h2>IMPACTO</h2>
        <p>Conoce cómo transformamos vidas y preservamos tradiciones año tras año</p>
        <div className="impactoAños">
          <div className="añosCirculo">Otros años</div>
          <div className="impactoAñosSeparador"></div>
          <div className="añosCirculo">2022</div>
          <div className="impactoAñosSeparador"></div>
          <div className="añosCirculo">2023</div>
          <div className="impactoAñosSeparador"></div>
          <div className="añosCirculo">2024</div>
          <div className="impactoAñosSeparador"></div>
          <div className="añosCirculo">2025</div>
        </div>


        <div className="informacionGeneralAñoImpacto">
          <div className="informacionAñoImpacto">
            <div className="añosCirculo">200</div>
            <p><strong>Artesanas</strong></p>
            <span>Más de 200 artesanas han impulsado sus creaciones</span>  
          </div>
          <div className="informacionAñoImpacto">
            <div className="añosCirculo">500</div>
            <p><strong>Comunidades</strong></p>
            <span>Más de 200 artesanas han impulsado sus creaciones</span>  
          </div>
          <div className="informacionAñoImpacto">
            <div className="añosCirculo">500k</div>
            <p><strong>Recaudaciones</strong></p>
            <span>Más de 200 artesanas han impulsado sus creaciones</span>  
          </div>
          <div className="informacionAñoImpacto">
            <div className="añosCirculo">50</div>
            <p><strong>Talleres</strong></p>
            <span>Más de 200 artesanas han impulsado sus creaciones</span>  
          </div>
        </div>
      </div>


    {/* SECCION DEL FOOTER */}
    <footer>
      <Image src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50}/>

      <div>
        <p>Enlaces</p>
        <a href="">Inicio</a>
        <a href="">Talleres</a>
        <a href="">Únete</a>
        <a href="">Programas</a>
      </div>

      <div>
        <p>Apoyo</p>
        <a href="">Donar</a>
        <a href="">Servicio social</a>
        <a href="">Contacto</a>
        <a href="">FAQ</a>
      </div>

      <div>
        <p>Contacto</p>
        <a href="">@nakawe.ab</a>
        <a href="">bordandonakawe@gmail.com</a>
        <a href="">+52 4461223336</a>
        <div className="redesSociales">
          <a href=""><Image src="/facebook.svg" alt="Logo Facebook" width={30} height={30}/></a>
          <a href=""><Image src="/instagram.svg" alt="Logo Instagram" width={30} height={30}/></a>
          <a href=""><Image src="/pinterest.svg" alt="Logo Pinterest" width={30} height={30}/></a>
          <a href=""><Image src="/whatsapp.svg" alt="Logo Whatsapp" width={30} height={30}/></a>
        </div>
      </div>
    </footer>

    <p className="derechosReservados">2025 Fundación NakaWé. Todos los derechos reservados</p> 
    </div>
    
  );
}

