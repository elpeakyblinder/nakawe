import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

const allowedTables = ['artisans', 'categories', 'collections', 'products']

export async function GET(
  req: NextRequest,
  { params }: { params: { table: string } }
) {
  const { table } = params

  if (!allowedTables.includes(table)) {
    return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 })
  }

  try {
    const query = `SELECT * FROM ${table} LIMIT 100;`
    const result = await sql.query(query)

    return NextResponse.json(result.rows)
  } catch (err) {
    return NextResponse.json({ error: 'Error al consultar la tabla', detail: String(err) }, { status: 500 })
  }
}
