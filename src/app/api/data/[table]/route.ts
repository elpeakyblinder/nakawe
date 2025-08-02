import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

const allowedTables = ['artisans', 'categories', 'collections', 'products', 'roles', 'users', 'user-roles', 'profiles']

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ table: string }> }
) {
  const params = await context.params;
  const { table } = params;
  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 })
  }

  try {
    let query;

    if (table === 'user-roles') {
      // CORRECCIÓN: Se cambió la consulta para que se una (JOIN) con la tabla 'profiles' en lugar de 'users'.
      query = `
        SELECT
          ur.user_id || '-' || ur.role_id AS id,
          p.first_name || ' ' || p.last_name AS user_name,
          r.name AS role_name
        FROM
          user_roles ur
        JOIN
          profiles p ON ur.user_id = p.id
        JOIN
          roles r ON ur.role_id = r.id;
      `;
    } else {
      // Se usa 'profiles' si la tabla solicitada es 'users' para mantener la consistencia.
      const tableName = table === 'users' ? 'profiles' : table;
      query = `SELECT * FROM ${tableName} LIMIT 100;`
    }

    const result = await sql.query(query)

    const rows = result.rows.map(row => ({
      ...row,
      id: String(row.id)
    }));
    
    return NextResponse.json(rows)

  } catch (err) {
    const error = err as Error;
    console.error(`Error en GET /api/data/${table}:`, error);
    return NextResponse.json({ error: 'Error al consultar la tabla', detail: error.message }, { status: 500 })
  }
}

// Se añade la función POST para manejar la creación de nuevos registros.
export async function POST(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  const { table } = params;

  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 });
  }

  try {
    const body = await req.json();
    
    // Lógica específica para crear una asignación de rol de usuario
    if (table === 'user-roles') {
      const { user_id, role_id } = body;
      if (!user_id || !role_id) {
        return NextResponse.json({ error: 'user_id y role_id son requeridos' }, { status: 400 });
      }
      await sql`INSERT INTO user_roles (user_id, role_id) VALUES (${user_id}, ${role_id});`;
      return NextResponse.json({ message: 'Rol asignado correctamente' }, { status: 201 });
    }

    // Aquí se podría añadir lógica POST para otras tablas si fuera necesario.

    return NextResponse.json({ error: `La operación POST no está implementada para la tabla ${table}` }, { status: 405 });

  } catch (err) {
    const error = err as Error;
    // Manejo de error para claves duplicadas
    if (error.message.includes('duplicate key value violates unique constraint')) {
        return NextResponse.json({ error: 'Esta asignación ya existe.' }, { status: 409 });
    }
    console.error(`Error en POST /api/data/${table}:`, error);
    return NextResponse.json({ error: 'Error al crear el registro', detail: error.message }, { status: 500 });
  }
}
