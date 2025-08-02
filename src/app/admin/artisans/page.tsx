'use client'

import Image from 'next/image'
import { useState } from 'react' // 1. Importamos useState
import AdminTable from '../adminTable'
import ArtisanForm from './ArtisansForm'
import AdminFunctions from '../adminFunctions' // 2. Importamos AdminFunctions
import '../admin.css'

type Artisan = {
  id: string
  user_id: string
  display_name: string
  bio: string
  profile_photo_url: string
  social_links: string
}

export default function ArtisansPage() {
  // 3. Creamos el estado y la función para manejar el trigger
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Foto', 'Nombre', 'Biografía', 'Acciones']

  const renderArtisanRow = (
    artisan: Artisan,
    onEdit: (item: Artisan) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={artisan.id}>
      <td>
        <img
          src={artisan.profile_photo_url || `https://placehold.co/40x40/EBF4FF/333333?text=${artisan.display_name.charAt(0)}`}
          alt="Foto de perfil"
          width={40}
          height={40}
          className="avatarImg"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.onerror = null;
            target.src = `https://placehold.co/40x40/EBF4FF/333333?text=${artisan.display_name.charAt(0)}`;
          }}
        />
      </td>
      <td>{artisan.display_name}</td>
      <td>{artisan.bio.substring(0, 50)}{artisan.bio.length > 50 ? '...' : ''}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(artisan)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        <button className="eliminarBtn" onClick={() => onDelete(artisan.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  const renderArtisanForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Artisan,
    onSuccess: () => void,
  }) => (
    <ArtisanForm
      mode={mode}
      initialData={initialData}
      onSuccess={onSuccess}
    />
  )

  return (
    // 4. Envolvemos todo en un Fragment y añadimos AdminFunctions
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de Artesanos"
        description="Administra los perfiles de los artesanos en la plataforma."
        searchPlaceholder="Busca un artesano"
        buttonText="Nuevo artesano"
        onNew={handleNew}
      />
      <AdminTable<Artisan>
        columns={columns}
        fetchUrl="/api/data/artisans"
        renderRow={renderArtisanRow}
        formTitle="Artesano"
        renderForm={renderArtisanForm}
        newTrigger={newTrigger} // 5. Pasamos el trigger a la tabla
      />
    </>
  )
}
