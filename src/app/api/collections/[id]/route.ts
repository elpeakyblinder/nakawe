import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// Se define un tipo para el contexto para mayor seguridad y claridad.
type RouteContext = {
  params: {
    id: string;
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  // Se corrige la obtención del 'id', ya que 'context.params' no es una promesa.
  const { id } = context.params;
  const { searchParams } = new URL(request.url);
  const getRandom = searchParams.get('random');
  const excludedProductId = searchParams.get('exclude');

  try {
    // --- NUEVA LÓGICA PARA OBTENER PRODUCTOS ALEATORIOS ---
    // Esto solo se ejecuta si la URL contiene "?random=true"
    if (getRandom === 'true') {
      const result = await sql`
        SELECT id, name, main_image_url, price, product_brief, production_time 
        FROM products 
        WHERE collection_id = ${id} AND id != ${excludedProductId};
      `;
      
      const shuffled = result.rows.sort(() => 0.5 - Math.random());
      const randomProducts = shuffled.slice(0, 6);

      return NextResponse.json(randomProducts);
    }

    // --- TU LÓGICA ORIGINAL SE MANTIENE INTACTA ---
    // Esto se ejecuta si la URL no tiene el parámetro "random".
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
