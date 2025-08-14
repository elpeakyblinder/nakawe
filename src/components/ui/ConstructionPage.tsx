import { Wrench } from 'lucide-react';
import Link from 'next/link';

export default function ConstructionPage() {
    return (
        <div className="flex bg-black flex-col items-center justify-center text-center py-20 px-4 min-h-screen">
            <div className='flex flex-col items-center justify-center mb-20'>
                <Wrench className="text-yellow-500" size={80} strokeWidth={1.5} />
                <h1 className="text-4xl font-bold text-white mt-6">
                    ¡Estamos Construyendo Algo Increíble!
                </h1>
                <p className="text-lg text-white mt-3 max-w-md">
                    Esta sección de nuestra página está actualmente en desarrollo. Vuelve pronto para descubrir las novedades que estamos preparando para ti. 🚧
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center justify-center px-6 py-2 bg-primary text-white font-semibold rounded-md shadow-md hover:bg-primary-hover transition-colors"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}