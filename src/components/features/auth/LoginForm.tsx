"use client"
import type React from "react"
import Image from 'next/image';
import { useState } from "react"
import styles from './LoginForm.module.css';
import { Button } from "@/components/ui/button";
import Frase from "@/components/ui/frase";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

            // ¡Login exitoso! Redirigir
            router.push('/');

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

                        <div className={styles.campoForm}>
                            <label htmlFor="password">CONTRASEÑA</label>
                            <input
                                className={styles.input}
                                type="password"
                                placeholder="Tu contraseña"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.forgot}>
                            <span>
                                <a href="#">¿Olvidaste tu contraseña?</a>
                            </span>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Button type="submit" variant="primary" disabled={isLoading}>
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
                        width={50}
                        height={50}
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
        </div>
    );
}