'use client'

import Image from 'next/image'
import { useState } from 'react' // 1. Importamos useState
import AdminTable from './adminTable'
import UserForm from './UserForm'
import AdminFunctions from './adminFunctions'
import './admin.css'

type Profile = {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
}

export default function AdminPage() {
  // 2. Creamos el estado que servirá como "trigger"
  const [newTrigger, setNewTrigger] = useState(0)

  // 3. Definimos la función handleNew que se pasará a AdminFunctions
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Avatar', 'Nombre', 'Apellido', 'Acciones']

  const renderProfileRow = (
    profile: Profile,
    onEdit: (item: Profile) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={profile.id}>
      <td>
        <Image
          src={profile.avatar_url}
          alt="Avatar"
          width={40}
          height={40}
          className="avatarImg"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null;
            target.src = `https://placehold.co/40x40/EBF4FF/333333?text=${profile.first_name.charAt(0)}`;
          }}
        />
      </td>
      <td>{profile.first_name}</td>
      <td>{profile.last_name}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(profile)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        <button className="eliminarBtn" onClick={() => onDelete(profile.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  const renderProfileForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Profile,
    onSuccess: () => void,
  }) => (
    <UserForm
      mode={mode}
      initialData={initialData}
      onSuccess={onSuccess}
    />
  )

  return (
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de usuarios"
        description="Administra la información de los usuarios registrados."
        searchPlaceholder="Busca un usuario"
        buttonText="Nuevo usuario"
        onNew={handleNew} // 4. Pasamos la función al botón
      />
      <AdminTable<Profile>
        columns={columns}
        fetchUrl="/api/users"
        renderRow={renderProfileRow}
        formTitle="Usuario"
        renderForm={renderProfileForm}
        newTrigger={newTrigger} // 5. Pasamos el trigger a la tabla
      />
    </>
  )
}
