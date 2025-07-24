"use client"
import { ArrowRight, Heart, Eye, EyeOff, Check } from "lucide-react"
import type React from "react"
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react"
import styles from './RegisterForm.module.css';
import { Button } from "@/components/ui/button"


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "comprador",
        acceptTerms: false,
        acceptNewsletter: false,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Register attempt:", formData)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <span>
                        Non- profit Regenative Community
                    </span>
                    <Image
                        src="/pajaro.png"
                        alt="Pajaro"
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.subheader}>
                    <div>
                        <span>
                            Unete a Nakawé
                        </span>
                    </div>
                    <div>
                        <span>
                            Forma parte de nuestra comunidad
                        </span>
                    </div>
                </div>
                <div>
                    <Image
                        src="/artesanoSustituto.png"
                        alt="Artesano Sustituto"
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.frases}>
                    <div>
                        <span>"Lorem ipsum dolor sit amet, consectetur adipiscing elit."</span>
                    </div>
                    <div>
                        <span>- Fundacion nakawé</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.formContainer}>
                    <div className={styles.headerForm}>
                        <h1>CREA TU CUENTA</h1>
                        <span>Únete a la comunidad NakaWé</span>
                    </div>
                    <form action="" className={styles.form}>
                        <div className={styles.nameFields}>
                            <div>
                                <label htmlFor="Name">NOMBRE</label>
                                <input type="text" placeholder="Tu nombre" id="Name" />
                            </div>
                            <div>
                                <label htmlFor="">APELLIDO</label>
                                <input type="text" placeholder="Tu apellido" id="LastName" />
                            </div>
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="Email">CORREO ELECTRÓNICO</label>
                            <input type="email" placeholder="Tu correo electrónico" id="Email" />
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="Password">CONTRASEÑA</label>
                            <input type="password" placeholder="Tu contraseña" id="Password" />
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="ConfirmPassword">CONFIRMAR CONTRASEÑA</label>
                            <input type="password" placeholder="Confirma tu contraseña" id="ConfirmPassword" />
                        </div>
                        <div>
                            <Button variant="primary">Crear Cuenta</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// {/* <div>
//             <div>
//                 {/* Lado Izquierdo - Visual */}
//                 <div>
//                     <div>
//                         <div>
//                             {/* Logo */}
//                             <div>
//                                 <Heart />
//                             </div>

//                             {/* Contenido */}
//                             <div>
//                                 <div></div>
//                                 <h2>ÚNETE A NAKAWE</h2>
//                                 <p>
//                                     Forma parte de nuestra comunidad que preserva tradiciones y crea oportunidades
//                                 </p>
//                             </div>

//                             {/* Beneficios */}
//                             <div>
//                                 <div>
//                                     <div><Check /></div>
//                                     <span>Acceso exclusivo a colecciones</span>
//                                 </div>
//                                 <div>
//                                     <div><Check /></div>
//                                     <span>Historias de artesanas</span>
//                                 </div>
//                                 <div>
//                                     <div><Check /></div>
//                                     <span>Eventos y talleres especiales</span>
//                                 </div>
//                                 <div>
//                                     <div><Check /></div>
//                                     <span>Impacto directo en comunidades</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Lado Derecho - Formulario */}
//                 <div>
//                     <div>
//                         {/* Header */}
//                         <div>
//                             <div></div>
//                             <h1>CREAR CUENTA</h1>
//                             <p>Únete a la comunidad NakaWé</p>
//                         </div>

//                         {/* Formulario */}
//                         <form onSubmit={handleSubmit}>
//                             {/* Campos de Nombre */}
//                             <div>
//                                 <div>
//                                     <label htmlFor="firstName">NOMBRE</label>
//                                     <input
//                                         type="text"
//                                         id="firstName"
//                                         name="firstName"
//                                         value={formData.firstName}
//                                         onChange={handleInputChange}
//                                         required
//                                         placeholder="Tu nombre"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="lastName">APELLIDO</label>
//                                     <input
//                                         type="text"
//                                         id="lastName"
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleInputChange}
//                                         required
//                                         placeholder="Tu apellido"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Email */}
//                             <div>
//                                 <label htmlFor="email">CORREO ELECTRÓNICO</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     required
//                                     placeholder="tu@email.com"
//                                 />
//                             </div>

//                             {/* Tipo de Usuario */}
//                             <div>
//                                 <label htmlFor="userType">TIPO DE USUARIO</label>
//                                 <select
//                                     id="userType"
//                                     name="userType"
//                                     value={formData.userType}
//                                     onChange={handleInputChange}
//                                 >
//                                     <option value="comprador">Comprador Consciente</option>
//                                     <option value="artesana">Artesana</option>
//                                     <option value="colaborador">Colaborador/Voluntario</option>
//                                     <option value="organizacion">Organización</option>
//                                 </select>
//                             </div>

//                             {/* Contraseña */}
//                             <div>
//                                 <label htmlFor="password">CONTRASEÑA</label>
//                                 <div>
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         id="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleInputChange}
//                                         required
//                                         placeholder="••••••••"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                     >
//                                         {showPassword ? <EyeOff /> : <Eye />}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Confirmar Contraseña */}
//                             <div>
//                                 <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
//                                 <div>
//                                     <input
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         id="confirmPassword"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleInputChange}
//                                         required
//                                         placeholder="••••••••"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                     >
//                                         {showConfirmPassword ? <EyeOff /> : <Eye />}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Términos y Newsletter */}
//                             <div>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         name="acceptTerms"
//                                         checked={formData.acceptTerms}
//                                         onChange={handleInputChange}
//                                         required
//                                     />
//                                     <span>
//                                         Acepto los <Link href="/terminos">términos y condiciones</Link> y la <Link href="/privacidad">política de privacidad</Link>
//                                     </span>
//                                 </label>
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         name="acceptNewsletter"
//                                         checked={formData.acceptNewsletter}
//                                         onChange={handleInputChange}
//                                     />
//                                     <span>Quiero recibir noticias sobre nuevas colecciones, eventos y el impacto de mi participación</span>
//                                 </label>
//                             </div>

//                             {/* Botón de Enviar */}
//                             <button type="submit">
//                                 Crear Cuenta <ArrowRight />
//                             </button>
//                         </form>

//                         {/* Divisor */}
//                         <div>
//                             <div></div>
//                             <span>O</span>
//                             <div></div>
//                         </div>

//                         {/* Registro Social */}
//                         <div>
//                             <button>
//                                 <div></div> Registrarse con Google
//                             </button>
//                             <button>
//                                 <div></div> Registrarse con Facebook
//                             </button>
//                         </div>

//                         {/* Enlace a Iniciar Sesión */}
//                         <div>
//                             <p>
//                                 ¿Ya tienes cuenta? <Link href="/login">Inicia sesión aquí</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div> */}