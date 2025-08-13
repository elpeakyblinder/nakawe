import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUserIdFromSession } from '@/lib/session';
import sharp from 'sharp';

export async function POST(request: Request): Promise<NextResponse> {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const avatarFile = formData.get('avatarFile') as File | null;

        let avatar_url: string | undefined = undefined;

        if (avatarFile) {
            const fileBuffer = Buffer.from(await avatarFile.arrayBuffer());
            const compressedBuffer = await sharp(fileBuffer)
                .resize(512, 512, { fit: 'cover' })
                .webp({ quality: 80 })
                .toBuffer();

            const blob = await put(`avatars/${userId}-${Date.now()}.webp`, compressedBuffer, {
                access: 'public',
                contentType: 'image/webp'
            });

            avatar_url = blob.url;

            await sql`
                UPDATE profiles 
                SET avatar_url = ${avatar_url}
                WHERE id = ${userId};
            `;
        }

        return NextResponse.json({ message: 'Perfil actualizado con éxito', url: avatar_url });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Error desconocido' }, { status: 500 });
    }
}
