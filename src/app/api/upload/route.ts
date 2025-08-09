import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const formData = await request.formData();

    const file = formData.get('avatarFile') as File | null;

    if (!file) {
        return NextResponse.json(
            { error: 'No se recibió ningún archivo con el campo "avatarFile".' },
            { status: 400 }
        );
    }

    const blob = await put(`avatars/temp-${Date.now()}-${file.name}`, file, {
        access: 'public',
    });

    return NextResponse.json({ url: blob.url });
}