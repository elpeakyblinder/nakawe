import { NextResponse } from 'next/server'
import { Pool } from '@neondatabase/serverless'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Eliminar un perfil por ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await pool.connect()

  try {
    await client.query('DELETE FROM profiles WHERE id = $1', [params.id])
    return NextResponse.json({ message: 'Perfil eliminado' }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar perfil:', error)
    return NextResponse.json({ error: 'Error al eliminar perfil' }, { status: 500 })
  } finally {
    client.release()
  }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { first_name, last_name, avatar_url } = await req.json()
  const client = await pool.connect()

  try {
    await client.query(
      'UPDATE profiles SET first_name = $1, last_name = $2, avatar_url = $3 WHERE id = $4',
      [first_name, last_name, avatar_url, params.id]
    )
    return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error al actualizar usuario' }, { status: 500 })
  } finally {
    client.release()
  }
}