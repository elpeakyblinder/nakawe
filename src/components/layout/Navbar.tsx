'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Globe, CircleUserRound, ShoppingBag } from 'lucide-react';
import { type UserProfileData } from '@/types/auth';
import styles from './Navbar.module.css';

interface NavbarProps {
    user: UserProfileData | null;
}

export default function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const hideNav = pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/register');
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Función para alternar el estado del menú.
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    if (hideNav) {
        return null;
    }

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.burgerIcon}>
                <Link href="/">
                    <Image className={styles.logoNavbarMobile} src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50} />
                </Link>
                <button onClick={toggleMenu}>
                    <Image src="/iconos/burger.svg" alt="Menú" width={50} height={50} />
                </button>
            </div>

            <nav className={`${styles.navBar} ${isMenuOpen ? styles.navBarOpen : ''}`}>
                <Link href="/">
                    <Image className={styles.logoNavbar} src="/logoNakawe.png" alt="Logo Nakawe" width={170} height={50} />
                </Link>

                <div className={styles.linksDiv}>
                    <Link className={`${styles.links} ${pathname === '/' ? styles.activeLink : ''}`} href={'/'}>Cine</Link>
                    <Link className={`${styles.links} ${pathname === '/colecciones' ? styles.activeLink : ''}`} href={'/colecciones'}>Colecciones</Link>
                    <Link className={`${styles.links} ${pathname === '/objetivos' ? styles.activeLink : ''}`} href={'/objetivos'}>Objetivos</Link>
                    <Link className={`${styles.links} ${pathname === '/sobre-nosotros' ? styles.activeLink : ''}`} href={'/sobre-nosotros'}>Sobre nosotros</Link>
                    <Link className={`${styles.links} ${pathname === '/educativo' ? styles.activeLink : ''}`} href={'/educativo'}>Talleres</Link>
                </div>

                <div className={styles.rightNavBar}>
                    <button
                        title="Cambiar idioma"
                        className="text-white hover:text-primary transition-colors"
                    >
                        <Globe size={30} />
                    </button>
                    {user ? (
                        <div className={styles.userActions}>
                            <Link href="/carrito" className={styles.cartLink}>
                                <ShoppingBag size={30} />
                            </Link>
                            <Link href="/profile" className={styles.profileLink}>
                                <CircleUserRound size={30} />
                                <span>{user.first_name}</span>
                            </Link>
                        </div>
                    ) : (
                        <Link
                            href={'/login'}
                            className="inline-flex items-center justify-center px-4 py-2 bg-[#EC4899] hover:bg-[#D7007F] text-white font-semibold rounded-lg transition-colors"
                        >
                            Iniciar sesión
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}
