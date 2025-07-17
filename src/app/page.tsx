import Image from "next/image";

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
      
      <div>
        <div>
          <h2>15+</h2>
          <p>Comunidades</p>
        </div>

        <div>
          <h2>200+</h2>
          <p>Artesanos</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Talleres</p>
        </div>

        <div>
          <h2>7+</h2>
          <p>Años</p>
        </div>
      </div>

    {/* SECCION DE EVENTOS   */}

      <div className="eventos">
        <h2>Próximos Eventos</h2>

        <div></div> {/*BARRA DEJADO DE PROXIMOS EVENTOS*/}

        <p>Del 23 al 25 de Mayo</p> {/*¿¿¿Será mejor eliminarlo??? */}
        <p>San Cristóbal de las Casas</p>
        
        <div>
          <Image className="imageArrowLeft" src={'/arrow.svg'} width={50} height={50} alt="Arrow left"/>

          <div className="cardEvent cardEvent1">

          </div>

          <Image className="imageArrowRight" src={'/arrow.svg'} width={50} height={50} alt="Arrow right"/>
        </div>
      </div>



      <div className="colecciones"> {/*Seccion de colecciones*/}
        <h2>Colecciones</h2>
        <div className="barraDecorativaColecciones"></div>
        <p>Cada pieza cuenta una historia, cada colección preserva una tradición</p>

        <div className="presentacionColecciones"> {/*Seccion principal de colecciones, imagen y descripcion */}

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
