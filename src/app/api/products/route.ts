import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Esquema de validación para un nuevo producto
const ProductSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    code: z.string().min(1, "El código es requerido"),
    artisan_id: z.string().uuid("ID de artesano inválido").nullable().optional(),
    collection_id: z.string().uuid("ID de colección inválido"),
    category_id: z.string().uuid("ID de categoría inválido"),
    price: z.number().min(0),
    stock: z.number().int().min(0),
    main_image_url: z.string().url().optional().or(z.literal('')),
    description: z.string().optional().nullable(),
    product_brief: z.string().optional().nullable(),
    materials: z.string().optional().nullable(),
    production_time: z.string().optional().nullable(),
    origin: z.string().optional().nullable(),
    sale_type: z.string().optional().nullable(),
});

// PARA ENVIAR LOS PRODUCTOS A LA DB
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const data = ProductSchema.parse(json);

        const result = await sql`
            INSERT INTO products (
                name, code, artisan_id, collection_id, category_id, price, stock, main_image_url,
                description, product_brief, materials, production_time, origin, sale_type
            )
            VALUES (
                ${data.name}, ${data.code}, ${data.artisan_id}, ${data.collection_id}, ${data.category_id},
                ${data.price}, ${data.stock}, ${data.main_image_url},
                ${data.description}, ${data.product_brief}, ${data.materials}, 
                ${data.production_time}, ${data.origin}, ${data.sale_type}
            )
            RETURNING *;
        `;

        return NextResponse.json({ product: result.rows[0] }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Error de validación Zod:', error.issues);
            return NextResponse.json({ error: 'Datos inválidos', details: error.issues }, { status: 400 });
        }
        const message = error instanceof Error ? error.message : 'Error desconocido';
        return NextResponse.json({ error: 'Error al crear el producto', detail: message }, { status: 500 });
    }
}