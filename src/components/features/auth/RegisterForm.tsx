"use client"
import { ArrowRight, Heart, Eye, EyeOff, Check } from "lucide-react"
import type React from "react"
import Image from 'next/image';
import { useState } from "react"
import styles from './RegisterForm.module.css';
import { Button } from "@/components/ui/button"
import Frase from "@/components/ui/frase";


export default function RegisterForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        // Validación de contraseñas iguales
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Error al registrar');
            } else {
                setSuccess('Cuenta creada con éxito');
                setError('');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

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
                        <h1></h1>
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
                        className="rounded-full"
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

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.nameFields}>
                            <div>
                                <label htmlFor="firstName">NOMBRE</label>
                                <input className={styles.input} type="text" placeholder="Tu nombre" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="lastName">APELLIDO</label>
                                <input className={styles.input} type="text" placeholder="Tu apellido" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="email">CORREO ELECTRÓNICO</label>
                            <input className={styles.input} type="email" placeholder="Tu correo electrónico" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="password">CONTRASEÑA</label>
                            <input className={styles.input} type="password" placeholder="Tu contraseña" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
                            <input className={styles.input} type="password" placeholder="Confirma tu contraseña" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}