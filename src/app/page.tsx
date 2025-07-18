'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  label: string;
}
const Counter: React.FC<CounterProps> = ({ target, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 3000; // duración total en ms
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
    <div className="inicioPrincipal">
      {/* SECCION DEL HEADER */}
      <section className="header">
        <div className="headerParte1">
          <p className="headerMiniTitulo">COMUNIDAD GENERATIVA SIN FINES DE LUCRO</p>
  
          <div className="headerTitulo">
            <h1>Y CON HISTORIAS</h1>
            <h1>TEJER</h1>
            <h1>LAS</h1>
            <h1>CONSCIENCIAS</h1>
          </div>
  
          <p>Conectamos tradiciones ancestrales con innovación sostenible para crear un futuro regenerativo</p>
  
          <p className="textoRosa"><strong>NakaWé - Madre de la Tierra</strong></p>
  
          <div className="headerButtons">
            <button className="headerButton1">Ver Galeria</button>
            <button className="headerButton2">Ver Catalogos</button>
            <button className="headerButton3">Contribuye</button>
          </div>
        </div>
  
        <Image src="/artesanoSustituto.png" alt="Logo Nakawe" width={700} height={450}/>
      </section>


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

        <div className="eventosBar"></div> {/*BARRA DEBAJADO DE PROXIMOS EVENTOS*/}

        <p>Del 23 al 25 de Mayo</p> {/*¿¿¿Será mejor eliminarlo??? */}
        <p>San Cristóbal de las Casas</p>
        
        <div className="cardsEvents">
          <Image className="imageArrowLeft" src={'/arrow.svg'} width={50} height={50} alt="Arrow left"/>

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
                <Image src={'/arrow.svg'} alt="Icono de tipo de evento" width={40} height={40}/>
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
                <Image src={'/arrow.svg'} alt="Icono de tipo de evento" width={40} height={40}/>
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
                <Image src={'/arrow.svg'} alt="Icono de tipo de evento" width={40} height={40}/>
                <p className="textoBlancoOpaco">Taller</p>
              </div>

            </div>

            <Image  src={'/artesanoSustituto.png'} alt="Imagen del evento" width={200} height={200}/>

            <h4>Cena de recaudación</h4>
            <p className="textoBlancoSemiOpaco">Encuentro gastronómico con música y subastas</p>
            <button>Asistir</button>
          </div>


          <Image className="imageArrowRight" src={'/arrow.svg'} width={50} height={50} alt="Arrow right"/>
        </div>
      </div>


{/* SECCION DE COLECCIONESSS */}
      <div className="colecciones"> {/*Seccion de colecciones*/}
        <h2>Colecciones</h2>
        <div className="barraDecorativaColecciones"></div>
        <p>Cada pieza cuenta una historia, cada colección preserva una tradición</p>

        <div className="presentacionColecciones"> {/*Seccion principal de colecciones, imagen y descripcion */}
          <div className="coleccionesZonaTop">
            <div className="presentacionColeccionesImagen">
              <div>
                <h3>Textiles ancestrales</h3>
                <p>Huipiles, rebozos y textiles bordados a mano por maestras artesanas de Chiapas</p>

                <p>24 Piezas únicas</p>
                <button>Explora</button>
              </div>
            </div>

            <div>
              <h2>Tradición que vive</h2>
              <p>Cada hilo cuenta una historia ancestral. Nuestras colecciones preservan técnicas milenarias mientras crean oportunidades económicas para las comunidades artesanas.</p>
              <ul>
                <li typeof="disc">Técnicas ancestrales preservadas</li>
                <li typeof="disc">Comercio justo y sostenible</li>
                <li typeof="disc">Piezas únicas y auténticas</li>
              </ul>
            </div>
          </div>



          <div className="coleccionesCards">

            <div>
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <h5>Textiles</h5>
              <p>Huipiles, rebozos y bordados</p>
              <div>
                <span>24 Productos</span>
                <button><Image src={'/arrow-without-circle.svg'} alt="arrow icon" width={50} height={50} /></button>
              </div>
            </div>

            <div>
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <h5>Barro</h5>
              <p>Ollas, jarros y vajillas</p>
              <div>
                <span>24 Productos</span>
                <button><Image src={'/arrow-without-circle.svg'} alt="arrow icon" width={50} height={50} /></button>
              </div>
            </div>

            <div>
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <h5>Textiles</h5>
              <p>Blusas, manteles y decoración</p>
              <div>
                <span>24 Productos</span>
                <button><Image src={'/arrow-without-circle.svg'} alt="arrow icon" width={50} height={50} /></button>
              </div>
            </div>

            <div>
              <Image src={'/pattern.png'} height={100} width={150} alt="Pattern image"/>
              <h5>Textiles</h5>
              <p>Collares, aretes y pulseras</p>
              <div>
                <span>24 Productos</span>
                <button><Image src={'/arrow-without-circle.svg'} alt="arrow icon" width={50} height={50} /></button>
              </div>
            </div>


          </div>

        </div>


      </div>



    </div>
  );
}

