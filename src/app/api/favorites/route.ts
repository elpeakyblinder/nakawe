import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/session';
import { type FavoriteItem } from '@/types';

// --- OBTENER LOS FAVORITOS DEL USUARIO ---
export async function GET() {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { rows } = await sql<FavoriteItem>`
            SELECT 
                p.id, p.name, p.main_image_url, p.price, p.product_brief, p.production_time,
                p.artisan_id, p.category_id, p.collection_id, p.code, p.description,
                p.materials, p.origin, p.sale_type, p.stock,
                a.display_name as artisan_name,
                cat.name as category
            FROM user_favorites uf
            JOIN products p ON uf.product_id = p.id
            JOIN artisans a ON p.artisan_id = a.id
            JOIN categories cat ON p.category_id = cat.id
            WHERE uf.user_id = ${userId};
        `;

        const favoritesWithParsedPrice = rows.map(item => ({
            ...item,
            price: parseFloat(item.price as unknown as string),
        }));

        return NextResponse.json(favoritesWithParsedPrice);

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al obtener los favoritos', detail: message }, { status: 500 });
    }
}

// --- AÑADIR UN PRODUCTO A FAVORITOS ---
export async function POST(request: Request) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { productId } = await request.json();
        if (!productId) {
            return NextResponse.json({ error: 'Falta el ID del producto' }, { status: 400 });
        }

        // ON CONFLICT DO NOTHING evita un error si el favorito ya existe
        await sql`
            INSERT INTO user_favorites (user_id, product_id)
            VALUES (${userId}, ${productId})
            ON CONFLICT (user_id, product_id) DO NOTHING;
        `;
        return NextResponse.json({ message: 'Producto añadido a favoritos' }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al añadir a favoritos', detail: message }, { status: 500 });
    }
}

// --- QUITAR UN PRODUCTO DE FAVORITOS ---
export async function DELETE(request: Request) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { productId } = await request.json();
        if (!productId) {
            return NextResponse.json({ error: 'Falta el ID del producto' }, { status: 400 });
        }

        await sql`
            DELETE FROM user_favorites 
            WHERE user_id = ${userId} AND product_id = ${productId};
        `;
        return NextResponse.json({ message: 'Producto eliminado de favoritos' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al eliminar de favoritos', detail: message }, { status: 500 });
    }
}
