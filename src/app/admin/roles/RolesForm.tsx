'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// 1. Definimos el tipo de dato para un rol.
type Role = {
  // Se cambia 'id' a string para que coincida con la definición en la página.
  id: string
  name: string
}

type Props = {
  mode: 'create' | 'edit'
  // La prop initialData ahora espera el tipo Role con id: string.
  initialData?: Role
  onSuccess: () => void
}

export default function RolesForm({ mode, initialData, onSuccess }: Props) {
  const [name, setName] = useState('')

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name)
    }
  }, [initialData, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name,
    }

    const endpoint =
      mode === 'edit' ? `/api/data/roles/${initialData?.id}` : '/api/data/roles'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        onSuccess()
      } else {
        alert('Error al guardar el rol')
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error)
      alert('Error de red o de servidor.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userForm roleForm">
      <label>
        Nombre del Rol:
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <button type="submit">
        {mode === 'edit' ? 'Guardar cambios' : 'Crear rol'}
      </button>
    </form>
  )
}
