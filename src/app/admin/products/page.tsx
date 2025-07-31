'use client'

import Image from 'next/image'
import AdminTable from '../adminTable' // Asegúrate que la ruta sea correcta
// Necesitarás crear este formulario para que funcione la creación/edición
import ProductForm from './ProductForm' 
import '../admin.css'

// 1. El tipo de dato para productos ya está definido correctamente.
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
  // 2. Se actualizan las columnas para que coincidan con los datos del producto.
  const columns = ['Código', 'Nombre', 'Precio', 'Acciones']
  

  // 3. Se actualiza la función para renderizar la fila con los datos del producto.
  const renderProductRow = (
    product: Product,
    onEdit: (item: Product) => void,
    onDelete: (id: string) => void
  ) => (
    <tr key={product.id}>
      <td>{product.code}</td>
      <td>{product.name}</td>
      {/* Formateamos el precio para que se muestre como moneda */}
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

  // 4. Se define una función para renderizar el formulario de productos.
  // Esta función usará el componente ProductForm.
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

  // 5. Se renderiza AdminTable con las props correctas para productos.
  return (
    <AdminTable<Product>
      columns={columns}
      fetchUrl="/api/data/products" // La URL para obtener los productos
      renderRow={renderProductRow} // La función para renderizar filas de productos
      formTitle="Producto" // El título para el modal
      renderForm={renderProductForm} // La función para renderizar el formulario de productos
    />
  )
}
