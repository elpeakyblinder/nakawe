'use client'

import { useState, useEffect } from 'react'
import './admin.css'

export default function UserForm({
  mode,
  initialData,
  onSuccess,
}: {
  mode: 'create' | 'edit'
  initialData?: {
    id: string
    first_name: string
    last_name: string
    avatar_url: string
  }
  onSuccess: () => void
}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name)
      setLastName(initialData.last_name)
      setAvatarUrl(initialData.avatar_url)
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      first_name: firstName,
      last_name: lastName,
      avatar_url: avatarUrl,
    }

    const endpoint =
      mode === 'edit' ? `/api/users/${initialData?.id}` : '/api/users'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      onSuccess()
    } else {
      alert('Error al guardar usuario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='userForm'>
      <label>
        Nombre:
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <label>
        Apellido:
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <label>
        Avatar URL:
        <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
      </label>
      <button type="submit">{mode === 'edit' ? 'Guardar cambios' : 'Crear usuario'}</button>
    </form>
  )
}
