'use client'

import Image from 'next/image'
import { useState } from 'react' // 1. Importamos useState
import AdminTable from '../adminTable'
import ProductForm from './ProductForm'
import AdminFunctions from '../adminFunctions' // 2. Importamos AdminFunctions
import '../admin.css'

type Product = {
  id: string
  code: string
  name: string
  description: string
  productBrief: string
  materials: string
  productionTime: string
  price: number
}

export default function ProductsPage() {
  // 3. Creamos el estado y la función para manejar el trigger
  const [newTrigger, setNewTrigger] = useState(0)
  const handleNew = () => {
    setNewTrigger(c => c + 1)
  }

  const columns = ['Código', 'Nombre', 'Precio', 'Acciones']

  const renderProductRow = (
    product: Product,
    onEdit: (item: Product) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={product.id}>
      <td>{product.code}</td>
      <td>{product.name}</td>
      <td>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product.price)}</td>
      <td className="actionButtonsAdmin">
        <button className="editarBtn" onClick={() => onEdit(product)}>
          <Image src="/iconos/edit.svg" alt="edit icon" width={20} height={20} />
          Editar
        </button>
        <button className="eliminarBtn" onClick={() => onDelete(product.id)}>
          <Image src="/iconos/delete.svg" alt="delete icon" width={20} height={20} />
          Eliminar
        </button>
      </td>
    </tr>
  )

  const renderProductForm = ({ mode, initialData, onSuccess }: {
    mode: 'create' | 'edit',
    initialData?: Product,
    onSuccess: () => void,
  }) => (
    <ProductForm
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
        title="Gestión de Productos"
        description="Administra los productos, materiales y precios de la tienda."
        searchPlaceholder="Busca un producto"
        buttonText="Nuevo producto"
        onNew={handleNew}
      />
      <AdminTable<Product>
        columns={columns}
        fetchUrl="/api/data/products"
        renderRow={renderProductRow}
        formTitle="Producto"
        renderForm={renderProductForm}
        newTrigger={newTrigger} // 5. Pasamos el trigger a la tabla
      />
    </>
  )
}
