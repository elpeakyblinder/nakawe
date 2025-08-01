import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUserIdFromSession } from '@/lib/session';

export async function POST(request: Request): Promise<NextResponse> {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        if (!file) {
            return NextResponse.json({ error: 'No se recibió ningún archivo.' }, { status: 400 });
        }

        const blob = await put(
            `avatars/${userId}-${file.name}`,
            file,
            { access: 'public' }
        );

        await sql`
            UPDATE profiles SET avatar_url = ${blob.url} WHERE id = ${userId};
        `;

        return NextResponse.json({ url: blob.url });

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 },
        );
    }
}