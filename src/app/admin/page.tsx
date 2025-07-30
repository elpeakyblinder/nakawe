'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './admin.css'
import UserForm from './UserForm'

type Profile = {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
}

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  const fetchProfiles = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setProfiles(data)
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = confirm('¿Estás seguro que quieres eliminar este perfil?')
    if (!confirmed) return

    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setProfiles(prev => prev.filter(p => p.id !== id))
    } else {
      alert('Error al eliminar perfil')
    }
  }

  const handleEdit = (profile: Profile) => {
    setSelectedUser(profile)
    setFormMode('edit')
    setShowForm(true)
  }

  const handleNew = () => {
    setSelectedUser(null)
    setFormMode('create')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setSelectedUser(null)
  }

  return (
    <div className="tablaContainer">

      <table className="tablaPerfiles">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="avatarImg"
                />
              </td>
              <td>{profile.first_name}</td>
              <td>{profile.last_name}</td>
              <td className="actionButtonsAdmin">
                <button className="editarBtn" onClick={() => handleEdit(profile)}>
                  <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
                  Editar
                </button>
                <button className="eliminarBtn" onClick={() => handleDelete(profile.id)}>
                  <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{formMode === 'edit' ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <UserForm
              mode={formMode}
              initialData={selectedUser || undefined}
              onSuccess={() => {
                closeForm()
                fetchProfiles()
              }}
            />
            <button className="cerrarBtn" onClick={closeForm}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}
