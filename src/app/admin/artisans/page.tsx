'use client'

import Image from 'next/image'
import AdminTable from '../adminTable' // Ajusta la ruta si es necesario
import ArtisanForm from './ArtisansForm' // Importamos el nuevo formulario
import '../admin.css'

// 1. Definimos el tipo de dato para el artesano.
type Artisan = {
  id: string
  user_id: string
  display_name: string
  bio: string
  profile_photo_url: string
  social_links: string
}

export default function ArtisansPage() {
  // 2. Definimos las columnas para la tabla de artesanos.
  const columns = ['Foto', 'Nombre', 'Biografía', 'Acciones']

  // 3. Función para renderizar cada fila de la tabla de artesanos.
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
      {/* Acortamos la biografía para que no ocupe mucho espacio en la tabla */}
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

  // 4. Función que renderiza el formulario de artesanos dentro del modal.
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

  // 5. Renderizamos el componente AdminTable con la configuración para artesanos.
  return (
    <AdminTable<Artisan>
      columns={columns}
      fetchUrl="/api/data/artisans" // CORREGIDO: La URL ahora incluye /data/ para coincidir con la ruta del API.
      renderRow={renderArtisanRow}
      formTitle="Artesano"
      renderForm={renderArtisanForm}
    />
  )
}
