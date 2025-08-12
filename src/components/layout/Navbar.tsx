'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Globe, CircleUserRound } from 'lucide-react';
import { type UserProfileData } from '@/types/auth';
import styles from './Navbar.module.css';

interface NavbarProps {
    user: UserProfileData | null;
}

export default function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const hideNav = pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/register');
    
    // Estado para controlar si el menú de hamburguesa está abierto o cerrado.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Función para alternar el estado del menú.
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (hideNav) {
        return null;
    }

    return (
        <>
            {/* Contenedor principal con el botón de hamburguesa y la barra de navegación */}
            <div className={styles.navbarContainer}>
                {/* Botón de hamburguesa que solo se muestra en pantallas pequeñas */}
                <div className={styles.burgerIcon}>
                    <button onClick={toggleMenu}>
                        <Image src="/iconos/burger.svg" alt="Burger icon" width={50} height={50} />
                    </button>
                </div>
            
                {/* La barra de navegación principal. La clase 'navBarOpen' se aplica
                  cuando el estado 'isMenuOpen' es verdadero, lo que le da los
                  estilos de menú de pantalla completa.
                */}
                <nav className={`${styles.navBar} ${isMenuOpen ? styles.navBarOpen : ''}`}>
                    <Link href="/">
                        <Image className='logoNavbar' src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50} />
                    </Link>

                    <div className={styles.linksDiv}>
                        <Link className={styles.links} href={'/'}>Cine</Link>
                        <Link className={styles.links} href={'/colecciones'}>Colecciones</Link>
                        <Link className={styles.links} href={'/'}>Objetivos</Link>
                        <Link className={styles.links} href={'/sobre-nosotros'}>Sobre nosotros</Link>
                        <Link className={styles.links} href={'/'}>Talleres</Link>
                    </div>

                    <div className={styles.rightNavBar}>
                        <button title="Cambiar idioma" className="languageButton">
                            <Globe size={30} color="#ffffff" />
                        </button>

                        {user ? (
                            <Link href="/profile" className={styles.profileLink}>
                                <CircleUserRound size={30} />
                                <span>{user.first_name}</span>
                            </Link>
                        ) : (
                            <button className={styles.loginButton}>
                                <Link className={styles.iniciarSesionLink} href={'/login'}>
                                    Iniciar sesión
                                </Link>
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}
