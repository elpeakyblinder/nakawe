'use client'
import { useState, useEffect, useRef } from 'react'
import ImageUploader, { type ImageUploaderHandles } from '@/components/features/profile/ImageUploader';
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
    avatar_url: string | null
  }
  onSuccess: () => void
}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png')
  const uploaderRef = useRef<ImageUploaderHandles>(null)

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name)
      setLastName(initialData.last_name)
      if (initialData.avatar_url) {
        setAvatarUrl(initialData.avatar_url)
      }
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newAvatarUrl = await uploaderRef.current?.upload();
    
    const payload = {
      first_name: firstName,
      last_name: lastName,
      avatar_url: newAvatarUrl || (mode === 'edit' ? initialData?.avatar_url : null),
    }

    const endpoint = mode === 'edit' ? `/api/users/${initialData?.id}` : '/api/users'
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

  const uploadUrl = mode === 'edit'
    ? `/api/admin/users/${initialData?.id}/avatar`
    : `/api/upload`;

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

      <div>
        <label>Foto de Perfil</label>
        <ImageUploader
          ref={uploaderRef}
          uploadUrl={uploadUrl} 
          initialImageUrl={initialData?.avatar_url || undefined}
          formFieldName="avatarFile" 
          imageContainerClassName="w-32 h-32 rounded-full"
          altText="Avatar del usuario"
          defaultImage="/default-avatar.png"
        />
      </div>
      
      <button type="submit">{mode === 'edit' ? 'Guardar cambios' : 'Crear usuario'}</button>
    </form>
  )
}