import Image from "next/image";
import "./producto.css";
import { League_Spartan } from 'next/font/google'
const leagueSpartan = League_Spartan({ subsets: ['latin'] })


export default function Producto(){
    return(
        <body className="bodyProducto {leagueSpartan.className}">
            <div className="productoPresentacion">
                <Image className="imagenPrenda" src={'/productoEjemplo.png'} alt="Tipo de coleccion" width={300} height={450}/>

                <div className="productoInformacion">
                    <div className="divMiniTitulo">
                        <p className="headerMiniTitulo">TEJIENDO HISTORIAS</p>
                    </div>
                    <h1>CAMISETA RECTÁNGULO ALTO CONTRASTE</h1>
                    <span>NT/TH/NKW01</span>
                    <p>Esta camisa unisex inspirada en la geometría simple de un rectángulo, rompe la convencionalidad con el alto contraste del color. En esta prenda convergen la elegancia y la comodidad, logrando una prenda versátil para la vida contemporánea. Los detalles sutiles de pliegues, cortes, y aberturas hablan por sí solos.</p>
                    <div className="productoMaterial">
                        <h6>MATERIAL: <span>SEDA</span></h6>
                        <p>Tafeta de seda prelavada en colores maíz y negro.</p>
                    </div>

                    <div className="productoPrecio">
                        <span>$3060MXN</span>
                        <button>Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </body>
    )
}