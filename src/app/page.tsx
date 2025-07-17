import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* SECCION DEL HEADER */}
      <section className="header">
        <div>
          <p>COMUNIDAD GENERATIVA SIN FINES DE LUCRO</p>
  
          <div>
            <h1>TEJIENDO</h1>
            <h1>LAS</h1>
            <h1>CONSCIENCIAS</h1>
          </div>
  
          <p>Conectamos tradiciones ancestrales con innovación sostenible para crear un futuro regenerativo</p>
  
          <p>NakaWé - Madre de la Tierra</p>
  
          <div>
            <button>Ver Galeria</button>
            <button>Ver Catalogos</button>
            <button>Contribuye</button>
          </div>
        </div>
  
        <Image src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50}/>
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



    </div>
  );
}
