'use client'

import Image from 'next/image'
import { useState } from 'react'
import AdminTable from '../adminTable'
import CollectionsForm from './CollectionsForm'
import AdminFunctions from '../adminFunctions'
import '../admin.css'

// El tipo de dato para la colección.
type Collection = {
  id: string
  artisan_id: string
  code: string
  name: string
  description: string
  target_market: string
  design_concept: string
  design_history: string
  cover_image_url: string
}

export default function CollectionsPage() {
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Código', 'Nombre', 'Descripción', 'Acciones']

  // Función para renderizar cada fila de la tabla.
  const renderCollectionRow = (
    collection: Collection,
    onEdit: (item: Collection) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={collection.id}>
      <td>{collection.code}</td>
      <td>{collection.name}</td>
      <td>{collection.description.substring(0, 50)}{collection.description.length > 50 ? '...' : ''}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(collection)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        <button className="eliminarBtn" onClick={() => onDelete(collection.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  // Función que renderiza el formulario dentro del modal.
  const renderCollectionForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Collection,
    onSuccess: () => void,
  }) => (
    <CollectionsForm
      mode={mode}
      initialData={initialData}
      onSuccess={onSuccess}
    />
  )

  // Renderizamos el componente AdminTable con la configuración para colecciones.
  return (
    <>
      <AdminFunctions
        mainTitle="PANEL DE ADMINISTRACIÓN"
        title="Gestión de Colecciones"
        description="Administra las colecciones de los artesanos."
        searchPlaceholder="Busca una colección"
        buttonText="Nueva colección"
        onNew={handleNew}
      />
      <AdminTable<Collection>
        columns={columns}
        fetchUrl="/api/data/collections"
        renderRow={renderCollectionRow}
        formTitle="Colección"
        renderForm={renderCollectionForm}
        newTrigger={newTrigger}
      />
    </>
  )
}
