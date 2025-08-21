"use client"
import type React from "react"
import Image from 'next/image';
import { useState } from "react"
import styles from './LoginForm.module.css';
import { Button } from "@/components/ui/button";
import Frase from "@/components/ui/frase";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            window.location.href = '/';

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
                <div className={styles.formContainer}>
                    <div className={styles.headerForm}>
                        <h1>INICIA SESION</h1>
                        <span>Accede a tu cuenta Nakawé</span>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.campoForm}>
                            <label htmlFor="email">CORREO ELECTRÓNICO</label>
                            <div className={styles.inputWrapper}>
                                <Mail className={styles.inputIcon} size={20} />
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
                            <div className={styles.inputWrapper}>
                                <Lock className={styles.inputIcon} size={20} />
                                <input
                                    className={styles.input}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Tu contraseña"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.forgot}>
                            <span>
                                <a style={{ color: 'var(--color-terciario-ui)' }} href="#">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </span>
                        </div>
                        <div className="text-center text-sm text:[var(--color-cuarto-ui)]">
                            <span>
                                ¿No tienes una cuenta?{' '}
                            </span>
                            <Link href="/register" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                                Regístrate
                            </Link>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Button className="text-xl rounded p-1.5" type="submit" variant="primary"  disabled={isLoading}>
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.header}>
                    <span>
                        Bienvenido de vuelta
                    </span>
                    <Image
                        src="/pajaro.png"
                        alt="Pajaro"
                        width={70}
                        height={50}
                        className={styles.image}
                    />
                </div>
                <div className={styles.subheader}>
                    <div>
                        <span>
                            NakaWé - Madre de la tierra
                        </span>
                    </div>
                    <div>
                        <span>
                            Comunidad regenerativa
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
        </div>
    );
}