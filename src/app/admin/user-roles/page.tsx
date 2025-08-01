'use client'

import Image from 'next/image'
import { useState } from 'react'
import AdminTable from '../adminTable'
import UserRolesForm from './UserRolesForm'
import AdminFunctions from '../adminFunctions'
import '../admin.css'

// El tipo de dato para una asignación de rol.
// Tu API debe devolver estos campos, haciendo un JOIN entre las tablas.
type UserRole = {
  id: string; // Un ID compuesto, ej: "user_uuid-role_id"
  user_name: string;
  role_name: string;
}

export default function UserRolesPage() {
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Usuario', 'Rol Asignado', 'Acciones']

  // Función para renderizar cada fila de la tabla.
  const renderUserRoleRow = (
    userRole: UserRole,
    onEdit: (item: UserRole) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={userRole.id}>
      <td>{userRole.user_name}</td>
      <td>{userRole.role_name}</td>
      <td className="actionButtonsAdmin">
        {/* En esta tabla, la "edición" no aplica. Se elimina y se crea una nueva asignación. */}
        <button className="eliminarBtn" onClick={() => onDelete(userRole.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Revocar
        </button>
      </td>
    </tr>
  )

  // Función que renderiza el formulario de asignación.
  const renderUserRoleForm = ({ onSuccess }: {
    onSuccess: () => void,
  }) => (
    <UserRolesForm
      onSuccess={onSuccess}
    />
  )

  return (
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de Roles de Usuario"
        description="Asigna roles a los diferentes usuarios del sistema."
        searchPlaceholder="Busca una asignación"
        buttonText="Asignar Rol"
        onNew={handleNew}
      />
      <AdminTable<UserRole>
        columns={columns}
        fetchUrl="/api/data/user-roles"
        renderRow={renderUserRoleRow}
        formTitle="Asignar Nuevo Rol"
        renderForm={renderUserRoleForm}
        newTrigger={newTrigger}
      />
    </>
  )
}
