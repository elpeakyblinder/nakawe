import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {

    const sessionToken = request.cookies.get('session_token')?.value;

    if (!sessionToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(sessionToken, secret);

        if (request.nextUrl.pathname.startsWith('/admin')) {
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }

        return NextResponse.next();

    } catch (err) {
        console.error('Error de verificación de JWT:', err);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// PARA PROTEGER TODAS LAS RUTAS DERIVADAS DEL ADMIN Y PERFIL
export const config = {
    matcher: [
        '/perfil/:path*',
        '/admin/:path*',
    ],
};