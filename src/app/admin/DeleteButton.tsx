// DeleteButton.tsx
'use client'

import Image from 'next/image'

export default function DeleteButton({ id, onDelete }: { id: string; onDelete: () => void }) {
  const handleDelete = async () => {
    console.log('Intentando eliminar', id)

    const confirmed = confirm("¿Estás seguro que quieres eliminar este perfil?")
    if (!confirmed) return

    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      onDelete()
    } else {
      alert('Error al eliminar perfil')
    }
  }

  return (
    <button className="eliminarBtn" onClick={handleDelete}>
      <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
      Eliminar
    </button>
  )
}
