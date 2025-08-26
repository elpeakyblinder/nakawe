import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// CORRECCIÓN: Se utiliza la firma de función que es compatible con tu proyecto.
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  // Se obtiene el 'productId' esperando la promesa de los parámetros.
  const { productId } = await context.params;

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

// Esquema de validación para actualizar (todos los campos son opcionales)
const UpdateProductSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  artisan_id: z.string().uuid().nullable().optional(),
  collection_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  price: z.number().min(0).optional(),
  stock: z.number().int().min(0).optional(),
  main_image_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional().nullable(),
  product_brief: z.string().optional().nullable(),
  materials: z.string().optional().nullable(),
  production_time: z.string().optional().nullable(),
  origin: z.string().optional().nullable(),
  sale_type: z.string().optional().nullable(),
});

export async function PUT(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const { productId } = await context.params;

  try {
    const json = await request.json();

    if (json.price !== undefined) json.price = Number(json.price);
    if (json.stock !== undefined) json.stock = Number(json.stock);

    const data = UpdateProductSchema.parse(json);

    const fields = Object.keys(data);
    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const values = Object.values(data);

    const query = `UPDATE products SET ${setClauses} WHERE id = $${fields.length + 1} RETURNING *;`;
    values.push(productId);

    const result = await sql.query(query, values);


    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ product: result.rows[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos', details: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: 'Error al actualizar el producto', detail: message }, { status: 500 });
  }
}