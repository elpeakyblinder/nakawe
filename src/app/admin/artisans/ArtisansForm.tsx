'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// 1. Definimos el tipo de dato para un artesano.
type Artisan = {
  id: string
  user_id: string
  display_name: string
  bio: string
  profile_photo_url: string
  social_links: string // Se tratará como texto, puede contener múltiples links.
}

type Props = {
  mode: 'create' | 'edit'
  initialData?: Artisan
  onSuccess: () => void
}

export default function ArtisanForm({ mode, initialData, onSuccess }: Props) {
  // 2. Creamos un estado para cada campo del formulario.
  const [userId, setUserId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [socialLinks, setSocialLinks] = useState('')

  // 3. Rellenamos el formulario con datos iniciales en modo de edición.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setUserId(initialData.user_id)
      setDisplayName(initialData.display_name)
      setBio(initialData.bio)
      setProfilePhotoUrl(initialData.profile_photo_url)
      setSocialLinks(initialData.social_links)
    }
  }, [initialData, mode])

  // 4. Manejador para el envío del formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      user_id: userId,
      display_name: displayName,
      bio,
      profile_photo_url: profilePhotoUrl,
      social_links: socialLinks,
    }

    const endpoint =
      mode === 'edit' ? `/api/artisans/${initialData?.id}` : '/api/artisans'
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
        alert('Error al guardar el artesano')
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error)
      alert('Error de red o de servidor.')
    }
  }

  // 5. Renderizamos el formulario JSX.
  return (
    <form onSubmit={handleSubmit} className="userForm artisanForm">
      <label>
        ID de Usuario (User ID):
        <input value={userId} onChange={(e) => setUserId(e.target.value)} required />
      </label>
      <label>
        Nombre a mostrar:
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
      </label>
      <label>
        Biografía:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
      </label>
      <label>
        URL de la foto de perfil:
        <input value={profilePhotoUrl} onChange={(e) => setProfilePhotoUrl(e.target.value)} />
      </label>
      <label>
        Enlaces a redes sociales (uno por línea):
        <textarea value={socialLinks} onChange={(e) => setSocialLinks(e.target.value)} rows={3} />
      </label>
      <button type="submit">
        {mode === 'edit' ? 'Guardar cambios' : 'Crear artesano'}
      </button>
    </form>
  )
}
