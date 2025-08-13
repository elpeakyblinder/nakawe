import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Esquema de validación para una nueva colección
const CollectionSchema = z.object({
  artisan_id: z.string().uuid(),
  code: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  target_market: z.string().optional(),
  design_concept: z.string().optional(),
  design_history: z.string().optional(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
});

// --- FUNCIÓN POST (PARA CREAR) ---
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = CollectionSchema.parse(json);

    const result = await sql`
      INSERT INTO collections (
        artisan_id, code, name, description, target_market, 
        design_concept, design_history, cover_image_url
      )
      VALUES (
        ${data.artisan_id}, ${data.code}, ${data.name}, ${data.description}, 
        ${data.target_market}, ${data.design_concept}, ${data.design_history}, 
        ${data.cover_image_url}
      )
      RETURNING *;
    `;

    return NextResponse.json({ collection: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/data/collections:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos', details: (error as z.ZodError).issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: 'Error al crear la colección', detail: message }, { status: 500 });
  }
}

// --- FUNCIÓN GET (PARA OBTENER TODAS) ---
export async function GET() {
  try {
    const query = `
      SELECT
        c.id, c.name, c.description, c.design_history, c.cover_image_url,
        a.display_name AS artisan_name,
        COUNT(p.id) AS product_count
      FROM collections c
      JOIN artisans a ON c.artisan_id = a.id
      LEFT JOIN products p ON c.id = p.collection_id
      GROUP BY c.id, a.display_name;
    `;
    const result = await sql.query(query);
    const rows = result.rows.map(row => ({
      ...row,
      id: String(row.id),
      product_count: parseInt(row.product_count as string, 10) || 0,
    }));
    return NextResponse.json(rows);
  } catch (err) {
    const error = err as Error;
    console.error("Error en GET /api/data/collections:", error);
    return NextResponse.json({ error: 'Error al consultar las colecciones', detail: error.message }, { status: 500 });
  }
}