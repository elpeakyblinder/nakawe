import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { sql } from '@vercel/postgres';
import { type UserProfileData } from '@/types/auth';

export async function getAuthenticatedUserProfile(): Promise<UserProfileData | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
        return null;
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(sessionToken, secret);
        const userId = payload.userId as string;

        const { rows } = await sql<UserProfileData>`
            SELECT 
                u.email,
                u.created_at,
                u.status,
                r.name AS role,
                p.first_name,
                p.last_name,
                p.birth_date,
                p.avatar_url
            FROM users AS u
            LEFT JOIN profiles AS p ON u.id = p.id
            LEFT JOIN user_roles AS ur ON u.id = ur.user_id
            LEFT JOIN roles AS r ON ur.role_id = r.id
            WHERE u.id = ${userId};
        `;
        console.log('Datos obtenidos de la base de datos:', rows);
        if (rows.length === 0) {
            return null;
        }

        return rows[0];

    } catch (err) {
        console.error('Fallo al obtener perfil:', err);
        return null;
    }
}