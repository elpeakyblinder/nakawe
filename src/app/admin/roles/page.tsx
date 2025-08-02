'use client'

import Image from 'next/image'
import { useState } from 'react'
import AdminTable from '../adminTable'
import RolesForm from './RolesForm'
import AdminFunctions from '../adminFunctions'
import '../admin.css'

// El tipo de dato para un rol.
type Role = {
  // Se cambia 'id' a string para que sea compatible con el componente genérico AdminTable,
  // que tiene una restricción que exige un 'id' de tipo string.
  id: string
  name: string
}

export default function RolesPage() {
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Nombre del Rol', 'Acciones']

  // Función para renderizar cada fila de la tabla.
  const renderRoleRow = (
    role: Role,
    onEdit: (item: Role) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={role.id}>
      <td>{role.name}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(role)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        {/* Como role.id ahora es string, ya no es necesario convertirlo. */}
        <button className="eliminarBtn" onClick={() => onDelete(role.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  // Función que renderiza el formulario dentro del modal.
  const renderRoleForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Role,
    onSuccess: () => void,
  }) => (
    <RolesForm
      mode={mode}
      initialData={initialData}
      onSuccess={onSuccess}
    />
  )

  // Renderizamos el componente AdminTable con la configuración para roles.
  return (
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de Roles"
        description="Administra los roles de los usuarios en el sistema."
        searchPlaceholder="Busca un rol"
        buttonText="Nuevo rol"
        onNew={handleNew}
      />
      <AdminTable<Role>
        columns={columns}
        fetchUrl="/api/data/roles"
        renderRow={renderRoleRow}
        formTitle="Rol"
        renderForm={renderRoleForm}
        newTrigger={newTrigger}
      />
    </>
  )
}
