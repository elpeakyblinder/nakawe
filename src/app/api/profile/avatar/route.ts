import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUserIdFromSession } from '@/lib/session'; // Asumiendo que esta función existe
import sharp from 'sharp';

export async function POST(request: Request): Promise<NextResponse> {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('avatarFile') as File;
        if (!file) {
            return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();
        const compressedImageBuffer = await sharp(fileBuffer)
            .resize(512, 512, { fit: 'cover' })
            .webp({ quality: 80 })
            .toBuffer();

        const blob = await put(
            `avatars/${userId}-${Date.now()}.webp`,
            compressedImageBuffer,
            { access: 'public', contentType: 'image/webp' }
        );

        await sql`
      UPDATE profiles SET avatar_url = ${blob.url} WHERE id = ${userId};
    `;

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}