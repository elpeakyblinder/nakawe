'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// Tipos de datos que el formulario necesita
type User = {
  id: string;
  first_name: string;
  last_name: string;
}

type Role = {
  id: string;
  name: string;
}

type Props = {
  // Este formulario solo se usará para crear nuevas asignaciones.
  // Editar o eliminar se hace desde la tabla principal.
  onSuccess: () => void
}

export default function UserRolesForm({ onSuccess }: Props) {
  // Estados para los menús desplegables
  const [userId, setUserId] = useState('')
  const [roleId, setRoleId] = useState('')

  // Estados para cargar los datos de los desplegables
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Efecto para obtener la lista de usuarios y roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacemos las dos peticiones a la API en paralelo
        const [usersRes, rolesRes] = await Promise.all([
          fetch('/api/data/users'),
          fetch('/api/data/roles')
        ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData);
        }
        if (rolesRes.ok) {
          const rolesData = await rolesRes.json();
          setRoles(rolesData);
        }
      } catch (error) {
        console.error('Error al cargar datos para el formulario:', error);
        alert('No se pudieron cargar los usuarios y roles.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId || !roleId) {
        alert("Por favor, selecciona un usuario y un rol.");
        return;
    }

    const payload = {
      user_id: userId,
      role_id: roleId,
    }

    try {
      const res = await fetch('/api/data/user-roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const errorData = await res.json();
        alert(`Error al asignar el rol: ${errorData.error || 'Error desconocido'}`)
      }
    } catch (error) {
      console.error('Error de red:', error)
      alert('Error de red al asignar el rol.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userForm userRoleForm">
      <label>
        Usuario:
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required disabled={isLoading}>
          <option value="" disabled>
            {isLoading ? 'Cargando...' : 'Selecciona un usuario'}
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Rol:
        <select value={roleId} onChange={(e) => setRoleId(e.target.value)} required disabled={isLoading}>
          <option value="" disabled>
            {isLoading ? 'Cargando...' : 'Selecciona un rol'}
          </option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={isLoading}>
        Asignar Rol
      </button>
    </form>
  )
}
