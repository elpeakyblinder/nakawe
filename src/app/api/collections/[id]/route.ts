import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// El cambio está en la firma de esta función
export async function GET(request: Request, context: { params: { id: string } }) {
  // Se obtiene el 'id' desde el objeto 'context'
  const { id } = context.params; 

  try {
    // 1. Obtenemos los detalles de la colección específica
    const collectionQuery = sql`
      SELECT
        c.id, c.name, c.description, c.target_market, c.design_concept, c.design_history, c.cover_image_url,
        a.display_name AS artisan_name
      FROM collections c
      JOIN artisans a ON c.artisan_id = a.id
      WHERE c.id = ${id};
    `;

    // 2. Obtenemos todos los productos que pertenecen a esa colección
    const productsQuery = sql`
      SELECT * FROM products WHERE collection_id = ${id};
    `;

    // Ejecutamos ambas consultas al mismo tiempo para mayor eficiencia
    const [collectionResult, productsResult] = await Promise.all([collectionQuery, productsQuery]);

    // Si no se encuentra la colección, devolvemos un error 404
    if (collectionResult.rows.length === 0) {
      return NextResponse.json({ error: 'Colección no encontrada' }, { status: 404 });
    }

    const collection = collectionResult.rows[0];
    const products = productsResult.rows;

    // 3. Combinamos todo en una sola respuesta JSON
    const responseData = {
      ...collection,
      products: products
    };

    return NextResponse.json(responseData);

  } catch (err) {
    const error = err as Error;
    console.error(`Error en GET /api/collections/${id}:`, error);
    return NextResponse.json({ error: 'Error al consultar la colección', detail: error.message }, { status: 500 });
  }
}