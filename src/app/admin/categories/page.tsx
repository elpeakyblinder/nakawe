'use client'

import Image from 'next/image'
import { useState } from 'react' // 1. Importamos useState
import AdminTable from '../adminTable'
import CategoriesForm from './CategoriesForm'
import AdminFunctions from '../adminFunctions' // 2. Importamos AdminFunctions
import '../admin.css'

type Category = {
  id: string
  name: string
  description: string
}

export default function CategoriesPage() {
  // 3. Creamos el estado y la función para manejar el trigger
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Nombre', 'Descripción', 'Acciones']

  const renderCategoryRow = (
    category: Category,
    onEdit: (item: Category) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={category.id}>
      <td>{category.name}</td>
      <td>{category.description}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(category)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        <button className="eliminarBtn" onClick={() => onDelete(category.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  const renderCategoryForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Category,
    onSuccess: () => void,
  }) => (
    <CategoriesForm
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
        title="Gestión de Categorías"
        description="Administra las categorías de los productos."
        searchPlaceholder="Busca una categoría"
        buttonText="Nueva categoría"
        onNew={handleNew}
      />
      <AdminTable<Category>
        columns={columns}
        fetchUrl="/api/data/categories"
        renderRow={renderCategoryRow}
        formTitle="Categoría"
        renderForm={renderCategoryForm}
        newTrigger={newTrigger} // 5. Pasamos el trigger a la tabla
      />
    </>
  )
}
