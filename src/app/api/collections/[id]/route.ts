import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Esquema de validación para actualizar (todos los campos son opcionales)
const UpdateCollectionSchema = z.object({
  artisan_id: z.string().uuid().optional(),
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  target_market: z.string().optional(),
  design_concept: z.string().optional(),
  design_history: z.string().optional(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { searchParams } = new URL(request.url);
  const getRandom = searchParams.get('random');
  const excludedProductId = searchParams.get('exclude');

  try {
    // --- LÓGICA PARA OBTENER PRODUCTOS ALEATORIOS ---
    if (getRandom === 'true' && excludedProductId) {
      const result = await sql`
        SELECT id, name, main_image_url, price, product_brief, production_time 
        FROM products 
        WHERE collection_id = ${id} AND id != ${excludedProductId};
      `;

      const shuffled = result.rows.sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, 6);

      return NextResponse.json(randomProducts);
    }

    // --- LÓGICA ORIGINAL PARA OBTENER DETALLES DE LA COLECCIÓN ---
    const collectionQuery = sql`
      SELECT
        c.id, c.name, c.description, c.target_market, c.design_concept, c.design_history, c.cover_image_url,
        a.display_name AS artisan_name
      FROM collections c
      JOIN artisans a ON c.artisan_id = a.id
      WHERE c.id = ${id};
    `;

    const productsQuery = sql`
      SELECT * FROM products WHERE collection_id = ${id};
    `;

    const [collectionResult, productsResult] = await Promise.all([collectionQuery, productsQuery]);

    if (collectionResult.rows.length === 0) {
      return NextResponse.json({ error: 'Colección no encontrada' }, { status: 404 });
    }

    const collection = collectionResult.rows[0];
    const products = productsResult.rows;

    return NextResponse.json({ ...collection, products });

  } catch (err) {
    const error = err as Error;
    console.error(`Error en GET /api/data/collections/${id}:`, error);
    return NextResponse.json({ error: 'Error al consultar la colección', detail: error.message }, { status: 500 });
  }
}

// --- FUNCIÓN PUT (PARA EDITAR) ---
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const json = await request.json();
    const data = UpdateCollectionSchema.parse(json);

    const result = await sql`
      UPDATE collections
      SET 
        artisan_id = ${data.artisan_id},
        code = ${data.code},
        name = ${data.name},
        description = ${data.description},
        target_market = ${data.target_market},
        design_concept = ${data.design_concept},
        design_history = ${data.design_history},
        cover_image_url = ${data.cover_image_url}
      WHERE id = ${id}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Colección no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ collection: result.rows[0] });
  } catch (error) {
    console.error(`Error en PUT /api/collections/[id]:`, error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos', details: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: 'Error al actualizar la colección', detail: message }, { status: 500 });
  }
}
