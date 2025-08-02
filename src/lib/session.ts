import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// ESTE ARCHIVO SIRVE PARA OBTENER EL ID DEL USUARIO DE LA SESSION Y ASI FACILITAR FORMULARIOS Y OTRAS FUNCIONES

/**
 * Lee la cookie de sesión, verifica el token JWT y devuelve el ID del usuario.
 * @returns {Promise<string | null>} El ID del usuario si la sesión es válida, o null si no lo es.
 */
export async function getUserIdFromSession(): Promise<string | null> {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session_token')?.value;

    if (!sessionToken) {
        return null;
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(sessionToken, secret);

        return payload.userId as string;

    } catch (err) {
        console.error('Fallo en la verificación de la sesión:', err);
        return null;
    }
}