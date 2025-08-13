import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUserIdFromSession } from '@/lib/session';
import sharp from 'sharp';
export const runtime = 'nodejs';

export async function POST(request: Request) {
    try {
        const userId = await getUserIdFromSession();
        if (!userId) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        const formData = await request.formData();
        const avatarFile = formData.get('avatarFile') as File | null;

        if (!avatarFile) {
            return NextResponse.json({ error: 'No se recibió avatarFile en formData' }, { status: 400 });
        }

        // Validaciones opcionales: tipo y tamaño
        const mime = avatarFile.type || '';
        if (!mime.startsWith('image/')) {
            return NextResponse.json({ error: 'El archivo no es una imagen' }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await avatarFile.arrayBuffer());
        const compressedBuffer = await sharp(fileBuffer)
            .resize(512, 512, { fit: 'cover' })
            .webp({ quality: 80 })
            .toBuffer();

        const blob = await put(`avatars/${userId}-${Date.now()}.webp`, compressedBuffer, {
            access: 'public',
            contentType: 'image/webp'
        });

        const avatar_url = blob.url;

        await sql`
            UPDATE profiles SET avatar_url = ${avatar_url} WHERE id = ${userId};
        `;

        return NextResponse.json({ message: 'Perfil actualizado con éxito', url: avatar_url });

    } catch (err) {
        console.error('Error en /api/profile/avatar:', err);
        const message = err instanceof Error ? err.message : 'Error desconocido';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
