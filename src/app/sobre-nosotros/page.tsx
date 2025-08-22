import Image from "next/image";
// 1. Importar los estilos desde el archivo .module.css
import styles from "./sobre-nosotros.module.css";

export default function SobreNosotros() {
    return (
        <main>
            {/* 2. Se aplican las clases del módulo y se mantienen las globales */}
            <section className={styles.sobreNosotros}>
                <div className={styles.sobreNosotrosInicio}>
                    <div className={styles.sobreNosotrosPortada}>
                        <h2 className={styles.sobreNosotrosPortadaTitulo1}>SOBRE NOSOTROS</h2>
                        {/* 'imagenPrenda' se asume como clase global o de utilidad */}
                        <Image className="imagenPrenda" src={'/sobreNosotrosEjemplo.png'} alt="Tipo de coleccion" width={600} height={300} />
                        <h2 className={styles.sobreNosotrosPortadaTitulo2}>FUNDACIÓN NAKAWÉ B.C</h2>
                    </div>
                    <h3>Buscamos agregar valor y consciencia a la cadena productiva industrial diseño, textil, agrícola y de la moda para un mundo sostenible.</h3>
                    <p>Fundación Nakawé Bordando comunidades A.C. surge del replanteamiento de la satisfacción de las necesidades de vestido en un mundo de consumo. <br />Buscamos contribuir a una sociedad sostenible, equilibrada y justa al resignificar el verdadero valor de una prenda creada con técnicas ancestrales ligadas a los quehaceres del territorio: desde la agricultura a la expresión artística proponemos ver cada una de estas piezas como una obra de arte, y de esta forma generar consumo consciente.</p>
                </div>

                <div className={styles.sobreNosotrosDesarrolloHumano}>
                    <div>
                        <h3>Desarrollo humano para la sostenibilidad</h3>
                        <p>Desarrollo humano y sostenible dirigido a disminuir el impacto ecológico y violencia derivadas de hábitos sociales y de consumo.</p>
                    </div>
                    <Image className="imagenPrenda" src={'/artesanoSustituto.png'} alt="Tipo de coleccion" width={400} height={250} />
                </div>

                <div className={styles.sobreNosotrosDetrasEscenas}>
                    <div className={styles.sobreNosotrosDetrasEscenasPresentacion}>
                        <div>
                            <h3>Behind Our Scenes</h3>
                            <p>Nos proponemos mostrar la identidad de l(x)s artistas artesanos y manos ligadas a la riqueza biológica de su territorio, a su forma de entender la vida <br /> <br />.Llegar a la mente y consciencia de l(x)s consumidores de textiles, y artesanía para el consumo del mercado de diseño; sobre el verdadero valor detrás de una prenda, desde el origen de cada material que conforman a estas piezas, hasta las manos que lo trabajan.</p>
                        </div>
                        <Image className="imagenPrenda" src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={300} height={450} />
                    </div>

                    <Image className={styles.sobreNosotrosDetrasEscenasImagen} src={'/niño.png'} alt="Tipo de coleccion" width={700} height={450} />

                    <div className={styles.sobreNosotrosDetrasEscenasOfrecemos}>
                        <div>
                            <h4>¿Qué ofrecemos a l(x)s comunidades y a l(x)s integrantes de nuestra comunidad Nakawé.bc?</h4>
                            <p>Plataformas digitales y ambulantes de modelos educativos y productivos, plataformas creativas y comerciales, herramientas de marketing producción de material audiovisual en función de procesos de investigación ~acción participativa..</p>
                        </div>
                        <Image className="imagenPrenda" src={'/dosArtesanas.png'} alt="Tipo de coleccion" width={300} height={350} />
                    </div>
                </div>

                <div className={styles.sobreNosotrosBordemosComunidades}>
                    <h3>BORDEMOS COMUNIDAD</h3>
                    <div>
                        <Image className="imagenPrenda" src={'/mujerNosotros.png'} alt="Tipo de coleccion" width={200} height={200} />
                        <div>
                            <h4>Valores</h4>
                            <p>Autonomía</p>
                            <p>identidad</p>
                            <p>Proactividad</p>
                            <p>Honestidad</p>
                            <p>Pensamiento creativo</p>
                            <p>Sostenibilidad</p>
                            <p>Respeto a los seres vivos y el planeta</p>
                            <p>Trabajo colaborativo</p>
                        </div>
                    </div>
                </div>

                <div className={styles.sobreNosotrosApoyar}>
                    <h3>APOYAR</h3>
                    <div className={styles.sobreNosotrosApoyarBar}></div>
                    <h4>Fundación Nakawé Bordando Comunidades A.C</h4>
                    <Image className={styles.imageRounded} src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={200} height={200} />
                    <p>Non-Profit Regenerative community</p>
                    <button><strong>DONAR</strong></button>
                </div>

                <footer>
                    <Image src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50} />
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
                        <div className={styles.redesSociales}>
                            <a href=""><Image src="/facebook.svg" alt="Logo Facebook" width={30} height={30} /></a>
                            <a href=""><Image src="/instagram.svg" alt="Logo Instagram" width={30} height={30} /></a>
                            <a href=""><Image src="/pinterest.svg" alt="Logo Pinterest" width={30} height={30} /></a>
                            <a href=""><Image src="/whatsapp.svg" alt="Logo Whatsapp" width={30} height={30} /></a>
                        </div>
                    </div>
                </footer>
                <p className={styles.derechosReservados}>2025 Fundación NakaWé. Todos los derechos reservados</p>
            </section>
        </main>
    )
}
