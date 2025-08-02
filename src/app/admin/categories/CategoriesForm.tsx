'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// 1. Definimos el tipo de dato para una categoría.
type Category = {
  id: string
  name: string
  description: string
}

type Props = {
  mode: 'create' | 'edit'
  initialData?: Category
  onSuccess: () => void
}

export default function CategoriesForm({ mode, initialData, onSuccess }: Props) {
  // 2. Creamos un estado para cada campo del formulario.
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // 3. Rellenamos el formulario con datos iniciales en modo de edición.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name)
      setDescription(initialData.description)
    }
  }, [initialData, mode])

  // 4. Manejador para el envío del formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      name,
      description,
    }

    const endpoint =
      mode === 'edit' ? `/api/data/categories/${initialData?.id}` : '/api/data/categories'
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
        alert('Error al guardar la categoría')
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error)
      alert('Error de red o de servidor.')
    }
  }

  // 5. Renderizamos el formulario JSX.
  return (
    <form onSubmit={handleSubmit} className="userForm categoryForm">
      <label>
        Nombre:
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </label>
      <button type="submit">
        {mode === 'edit' ? 'Guardar cambios' : 'Crear categoría'}
      </button>
    </form>
  )
}
