import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: {
    productId: string;
  }
}

// Esta función se activa cuando se hace una petición a /api/products/[productId]
export async function GET(request: NextRequest, context: RouteContext) {
  const { productId } = context.params;

  try {
    // Hacemos una consulta que une el producto con su artesano para obtener el nombre
    const result = await sql`
      SELECT 
        p.*, 
        a.display_name as artisan_name 
      FROM 
        products p
      JOIN 
        artisans a ON p.artisan_id = a.id
      WHERE 
        p.id = ${productId};
    `;

    // Si no se encuentra el producto, devolvemos un error 404
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    // Devolvemos el primer (y único) producto encontrado
    return NextResponse.json(result.rows[0]);

  } catch (err) {
    const error = err as Error;
    console.error(`Error en GET /api/products/${productId}:`, error);
    return NextResponse.json({ error: 'Error al consultar el producto', detail: error.message }, { status: 500 });
  }
}
