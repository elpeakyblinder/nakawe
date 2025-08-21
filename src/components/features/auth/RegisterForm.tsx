"use client"
import type React from "react"
import Image from 'next/image';
import { useState } from "react"
import styles from './RegisterForm.module.css';
import { Button } from "@/components/ui/button"
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import Frase from "@/components/ui/frase";
import Link from "next/dist/client/link";

export default function RegisterForm() {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                throw new Error(data.error || 'Error al registrar');
            } else {
                setSuccess('¡Cuenta creada! Redirigiendo...');
                setError('');
                window.location.href = '/profile';
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado');
            }
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
                        className={styles.image}
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
                <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
                    <Image
                        src="/artesanoSustituto.png"
                        alt="Artesano Sustituto"
                        layout="fill"
                        objectFit="cover"
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
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"  />
                                    <input className={styles.input} type="text" placeholder="Tu nombre" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName">APELLIDO</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"  />
                                    <input className={styles.input} type="text" placeholder="Tu apellido" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                            </div>
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="email">CORREO ELECTRÓNICO</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    className={styles.input}
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="password">CONTRASEÑA</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input className={styles.input} type={showPassword ? "text" : "password"} placeholder="Tu contraseña" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.campoForm}>
                            <label htmlFor="confirmPassword">CONFIRMAR CONTRASEÑA</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input className={styles.input} type={showPassword ? "text" : "password"} placeholder="Confirma tu contraseña" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-center text-sm text:[var(--color-cuarto-ui)]">
                            <span>
                                ¿Ya tienes una cuenta?{' '}
                            </span>
                            <Link href="/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                Inicia sesión
                            </Link>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <Button className="text-xl rounded p-1.5" type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}