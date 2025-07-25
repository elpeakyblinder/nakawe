"use client"
import { ArrowRight, Heart, Eye, EyeOff, Check } from "lucide-react"
import type React from "react"
import Link from "next/link"
import Image from 'next/image';
import { useState } from "react"
import styles from './RegisterForm.module.css';
import { Button } from "@/components/ui/button"
import Frase  from "@/components/ui/frase";


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
                        width={200}
                        height={200}
                        className={styles.image}
                    />
                </div>
                <div className={styles.frases}>
                    <Frase
                        texto="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                        autor="Fundacion nakawé"
                    />
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
                                <input className={styles.input} type="text" placeholder="Tu nombre" id="Name" />
                            </div>
                            <div>
                                <label htmlFor="">APELLIDO</label>
                                <input className={styles.input} type="text" placeholder="Tu apellido" id="LastName" />
                            </div>
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="Email">CORREO ELECTRÓNICO</label>
                            <input className={styles.input} type="email" placeholder="Tu correo electrónico" id="Email" />
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="Password">CONTRASEÑA</label>
                            <input className={styles.input} type="password" placeholder="Tu contraseña" id="Password" />
                        </div>
                        <div className={styles.campoForm}>
                            <label htmlFor="ConfirmPassword">CONFIRMAR CONTRASEÑA</label>
                            <input className={styles.input} type="password" placeholder="Confirma tu contraseña" id="ConfirmPassword" />
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