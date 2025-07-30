import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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

        // 1. Insertar en users y obtener el id generado
        const userResult = await client.sql`
            INSERT INTO users (email, password_hash)
            VALUES (${email}, ${password_hash})
            RETURNING id;
        `;
        const userId = userResult.rows[0].id;

        // 2. Insertar en profiles usando el id del usuario
        await client.sql`
            INSERT INTO profiles (id, first_name, last_name)
            VALUES (${userId}, ${firstName}, ${lastName});
        `;

        // 3. Asignar el rol por defecto ('user')
        await client.sql`
            INSERT INTO user_roles (user_id, role_id)
            VALUES (
                ${userId},
                (SELECT id FROM roles WHERE name = 'user')
            );
        `;

        await client.sql`COMMIT`;

        return NextResponse.json({ message: 'Usuario creado exitosamente' }, { status: 201 });

    } catch (error: any) {
        await client.sql`ROLLBACK`;

        if (error.code === '23505') {
            return NextResponse.json({ error: 'El correo electrónico ya está registrado' }, { status: 409 });
        }
        console.error(error);
        return NextResponse.json({ error: 'Error al crear el usuario' }, { status: 500 });
    } finally {
        client.release();
    }
}