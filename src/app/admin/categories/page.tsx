'use client'

import Image from 'next/image'
import AdminTable from '../adminTable' // Ajusta la ruta si es necesario
import CategoriesForm from './CategoriesForm' // Importamos el nuevo formulario
import '../admin.css'

// 1. Definimos el tipo de dato para la categoría.
type Category = {
  id: string
  name: string
  description: string
}

export default function CategoriesPage() {
  // 2. Definimos las columnas para la tabla de categorías.
  const columns = ['Nombre', 'Descripción', 'Acciones']

  // 3. Función para renderizar cada fila de la tabla de categorías.
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

  // 4. Función que renderiza el formulario de categorías dentro del modal.
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

  // 5. Renderizamos el componente AdminTable con la configuración para categorías.
  return (
    <AdminTable<Category>
      columns={columns}
      fetchUrl="/api/data/categories" // Endpoint de la API para categorías
      renderRow={renderCategoryRow}
      formTitle="Categoría"
      renderForm={renderCategoryForm}
    />
  )
}
