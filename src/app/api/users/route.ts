import { NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Obtener lista de perfiles
export async function GET() {
  const client = await pool.connect()

  try {
    const result = await client.query(
      'SELECT id, first_name, last_name, avatar_url FROM profiles LIMIT 50'
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error al obtener perfiles:', error)
    return NextResponse.json({ error: 'Error al obtener perfiles' }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function POST(req: Request) {
  const { first_name, last_name, avatar_url } = await req.json()
  const client = await pool.connect()

  try {
    await client.query(
      'INSERT INTO profiles (first_name, last_name, avatar_url) VALUES ($1, $2, $3)',
      [first_name, last_name, avatar_url]
    )
    return NextResponse.json({ message: 'Usuario creado' }, { status: 201 })
  } catch (err) {
    console.error('Error al crear usuario:', err)  // <---- Aquí
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  } finally {
    client.release()
  }
}
