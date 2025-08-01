'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// Se define un tipo para los datos de un usuario, que se usarán en el dropdown.
type UserProfile = {
  id: string
  first_name: string
  last_name: string
}

// El tipo de dato para un artesano no cambia.
type Artisan = {
  id: string
  user_id: string
  display_name: string
  bio: string
  profile_photo_url: string
  social_links: string
}

type Props = {
  mode: 'create' | 'edit'
  initialData?: Artisan
  onSuccess: () => void
}

export default function ArtisanForm({ mode, initialData, onSuccess }: Props) {
  // Estados para los campos del formulario.
  const [userId, setUserId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [socialLinks, setSocialLinks] = useState('')

  // 1. Nuevos estados para cargar la lista de usuarios en el dropdown.
  const [users, setUsers] = useState<UserProfile[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(true)


  // Efecto para rellenar el formulario en modo de edición.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setUserId(initialData.user_id)
      setDisplayName(initialData.display_name)
      setBio(initialData.bio)
      setProfilePhotoUrl(initialData.profile_photo_url)
      setSocialLinks(initialData.social_links)
    }
  }, [initialData, mode])

  // 2. Nuevo efecto para obtener la lista de usuarios para el dropdown.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Se asume que este endpoint devuelve la lista de todos los usuarios.
        const res = await fetch('/api/data/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error('Error al cargar los usuarios');
        }
      } catch (error) {
        console.error('Error de red al cargar usuarios:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []); // Se ejecuta solo una vez al montar el componente.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      user_id: userId,
      display_name: displayName,
      bio,
      profile_photo_url: profilePhotoUrl,
      social_links: socialLinks,
    }

    // El endpoint para artesanos debe incluir /data/
    const endpoint =
      mode === 'edit' ? `/api/data/artisans/${initialData?.id}` : '/api/data/artisans'
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

  return (
    <form onSubmit={handleSubmit} className="userForm artisanForm">
      {/* 3. El input de texto se reemplaza por un menú desplegable (select). */}
      <label>
        Usuario:
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required disabled={isLoadingUsers}>
          <option value="" disabled>
            {isLoadingUsers ? 'Cargando usuarios...' : 'Selecciona un usuario'}
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
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
