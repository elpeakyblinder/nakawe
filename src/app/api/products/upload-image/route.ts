import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('productImage') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: 'No se recibió ningún archivo.' },
                { status: 400 }
            );
        }

        const fileBuffer = await file.arrayBuffer();
        const processedImageBuffer = await sharp(fileBuffer)
            .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        const originalFilename = file.name.substring(0, file.name.lastIndexOf('.'));
        const uniqueFilename = `${Date.now()}-${originalFilename}.webp`;

        const blob = await put(`products/${uniqueFilename}`, processedImageBuffer, {
            access: 'public',
            contentType: 'image/webp',
        });

        return NextResponse.json({ url: blob.url });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido.';
        return NextResponse.json(
            { error: `Ocurrió un error en el servidor: ${message}` },
            { status: 500 }
        );
    }
}