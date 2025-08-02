import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = params.id;

  try {
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
    console.error(`Error en GET /api/collections/${id}:`, error);
    return NextResponse.json({ error: 'Error al consultar la colección', detail: error.message }, { status: 500 });
  }
}
