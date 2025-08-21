import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/session';
import { type CartItem } from '@/types';

// --- OBTENER EL CARRITO DEL USUARIO ---
export async function GET() {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { rows } = await sql<CartItem>`
            SELECT 
                p.id, p.name, p.main_image_url, p.price, p.product_brief, p.production_time,
                p.artisan_id, p.category_id, p.collection_id, p.code, p.description,
                p.materials, p.origin, p.sale_type, p.stock,
                ci.quantity,
                a.display_name as artisan_name,
                cat.name as category
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            JOIN artisans a ON p.artisan_id = a.id
            JOIN categories cat ON p.category_id = cat.id
            WHERE ci.user_id = ${userId};
        `;

        const cartWithParsedPrice = rows.map(item => ({
            ...item,
            price: parseFloat(item.price as any),
        }));

        return NextResponse.json(cartWithParsedPrice);

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al obtener el carrito', detail: message }, { status: 500 });
    }
}

// --- AÑADIR UN PRODUCTO AL CARRITO ---
export async function POST(request: Request) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { productId, quantity } = await request.json();

        const { rows } = await sql`
            INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES (${userId}, ${productId}, ${quantity})
            ON CONFLICT (user_id, product_id)
            DO UPDATE SET quantity = cart_items.quantity + ${quantity}
            RETURNING *;
        `;
        return NextResponse.json(rows[0], { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al añadir el producto', detail: message }, { status: 500 });
    }
}

// --- ACTUALIZAR CANTIDAD O ELIMINAR PRODUCTO ---
export async function PUT(request: Request) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { productId, quantity } = await request.json();

        if (quantity < 1) {
            await sql`
            DELETE FROM cart_items WHERE user_id = ${userId} AND product_id = ${productId};
        `;
            return NextResponse.json({ message: 'Producto eliminado' });
        } else {
            const { rows } = await sql`
            UPDATE cart_items
            SET quantity = ${quantity}
            WHERE user_id = ${userId} AND product_id = ${productId}
            RETURNING *;
        `;
            return NextResponse.json(rows[0]);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al actualizar el producto', detail: message }, { status: 500 });
    }
}

// --- VACIAR EL CARRITO COMPLETO ---
export async function DELETE(request: Request) {
    const userId = await getUserIdFromSession();
    if (!userId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        await sql`
            DELETE FROM cart_items WHERE user_id = ${userId};
        `;
        return NextResponse.json({ message: 'Carrito vaciado exitosamente' });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al vaciar el carrito', detail: message }, { status: 500 });
    }
}
