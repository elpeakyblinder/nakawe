import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { type RegisterBody } from '@/types/auth';

export async function POST(request: Request) {
    const client = await db.connect();

    try {
        const { email, password, firstName, lastName }: RegisterBody = await request.json();

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await client.sql`BEGIN`;

        const userResult = await client.sql`
            INSERT INTO users (email, password_hash)
            VALUES (${email}, ${password_hash})
            RETURNING id;
        `;
        const userId = userResult.rows[0].id;

        await client.sql`
            INSERT INTO profiles (id, first_name, last_name)
            VALUES (${userId}, ${firstName}, ${lastName});
        `;

        await client.sql`
            INSERT INTO user_roles (user_id, role_id)
            VALUES (${userId}, (SELECT id FROM roles WHERE name = 'user'));
        `;

        await client.sql`COMMIT`;

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("La clave secreta JWT no está configurada");
        }

        const token = jwt.sign(
            { 
                userId: userId,
                email: email,
                role: 'user'
            },
            secret,
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });
        
        response.cookies.set('session_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60,
        });

        return response;

    } catch (error) {
        await client.sql`ROLLBACK`;
        if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
            return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 409 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    }
}