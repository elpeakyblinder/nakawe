'use client'

import Image from 'next/image'
import AdminTable from './adminTable' // Asegúrate que la ruta sea correcta
import UserForm from './UserForm' // Asegúrate que la ruta sea correcta
import './admin.css'
import AdminFunctions from './adminFunctions'

// 1. Define el tipo de dato para esta tabla específica.
type Profile = {
  id: string
  first_name: string
  last_name: string
  avatar_url: string
}

export default function AdminPage() {
  // 2. Define las columnas que se mostrarán en el encabezado de la tabla.
  const columns = ['Avatar', 'Nombre', 'Apellido', 'Acciones']
  // 3. Define una función para renderizar cada fila de la tabla.
  // Esta función recibe el item y los manejadores de eventos (onEdit, onDelete) desde AdminTable.
  const renderProfileRow = (
    profile: Profile,
    onEdit: (item: Profile) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={profile.id}>
      <td>
        <img
          src={profile.avatar_url}
          alt="Avatar"
          width={40}
          height={40}
          className="avatarImg"
          onError={(e) => {
            // Opcional: Maneja errores si la imagen no carga, mostrando un avatar por defecto.
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

  // 4. Define una función para renderizar el formulario de creación/edición.
  // Esta función recibe las props necesarias (mode, initialData, etc.) desde AdminTable.
  const renderProfileForm = ({ mode, initialData, onSuccess, onClose }: {
    mode: 'create' | 'edit',
    initialData?: Profile,
    onSuccess: () => void,
    onClose: () => void
  }) => (
    <UserForm
      mode={mode}
      initialData={initialData}
      onSuccess={onSuccess}
      // El prop `onClose` es provisto por AdminTable, pero UserForm no lo necesita
      // directamente, ya que el modal en AdminTable tiene su propio botón de cierre.
    />
  )

  // 5. Renderiza el componente AdminTable con las props específicas para los perfiles.
  return (
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de usuarios"
        description="Administra la información de los usuarios registrados."
        searchPlaceholder="Busca un usuario"
        buttonText="Nuevo usuario"
        onNew={handleNew} // Le pasamos la función para abrir el modal
      />
      <AdminTable<Profile>
        columns={columns}
        fetchUrl="/api/users"
        renderRow={renderProfileRow}
        formTitle="Usuario"
        renderForm={renderProfileForm}
        />
    </>
  )
}
