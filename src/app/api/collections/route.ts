import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Este archivo se encarga exclusivamente de las peticiones para las colecciones.
export async function GET() {
  try {
    // La consulta une las tablas para obtener los datos necesarios para las tarjetas de colección.
    const query = `
      SELECT
        c.id,
        c.name,
        c.description,
        c.design_history,
        c.cover_image_url,
        a.display_name AS artisan_name,
        COUNT(p.id) AS product_count
      FROM
        collections c
      JOIN
        artisans a ON c.artisan_id = a.id
      LEFT JOIN
        products p ON c.id = p.collection_id -- Se asume que la tabla 'products' tiene una columna 'collection_id'.
      GROUP BY
        c.id, a.display_name;
    `;

    const result = await sql.query(query);

    // Se asegura que el ID sea un string y el conteo de productos sea un número.
    const rows = result.rows.map(row => ({
      ...row,
      id: String(row.id),
      product_count: parseInt(row.product_count, 10) || 0,
    }));

    return NextResponse.json(rows);

  } catch (err) {
    const error = err as Error;
    console.error("Error en GET /api/collections:", error);
    // Devolvemos un objeto de error claro.
    return NextResponse.json({ error: 'Error al consultar las colecciones', detail: error.message }, { status: 500 });
  }
}
