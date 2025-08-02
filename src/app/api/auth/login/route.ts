import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña son requeridos' }, { status: 400 });
        }

        const result = await sql`
            SELECT u.id, u.email, u.password_hash, r.name as role
            FROM users u
            JOIN user_roles ur ON u.id = ur.user_id
            JOIN roles r ON ur.role_id = r.id
            WHERE u.email = ${email};
        `;
        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("La clave secreta JWT no está configurada");
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            secret,
            { expiresIn: '1h' } // DURACION DEL TOKEN 1 HORA, PUEDE SER MENOS O MÁS
        );

        const response = NextResponse.json({ message: 'Login exitoso', user });
        response.cookies.set('session_token', token, {
            httpOnly: true, // LAS COOKIE HTTP ONLY NO PUEDEN SER ACCEDIDAS POR JAVASCRIPT, ESTO EVITA XSS
            secure: process.env.NODE_ENV === 'production', // SOLO SE ENVÍA POR HTTPS EN PRODUCCIÓN
            path: '/',
            maxAge: 60 * 60, // TAMBIÉN DURA 1 HORA EL TOKEN
            sameSite: 'strict', // PROTEGE CONTRA CSRF
        });

        return response;

    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}