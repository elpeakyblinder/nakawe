'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// 1. Definimos los tipos para las props, usando el tipo Product.
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

type Props = {
  mode: 'create' | 'edit'
  initialData?: Product
  onSuccess: () => void
}

export default function ProductForm({ mode, initialData, onSuccess }: Props) {
  // 2. Creamos un estado para cada campo del formulario.
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [productBrief, setProductBrief] = useState('')
  const [materials, setMaterials] = useState('')
  const [productionTime, setProductionTime] = useState('')
  const [price, setPrice] = useState(0)

  // 3. Usamos useEffect para rellenar el formulario si estamos en modo 'edit'.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setCode(initialData.code)
      setName(initialData.name)
      setDescription(initialData.description)
      setProductBrief(initialData.productBrief)
      setMaterials(initialData.materials)
      setProductionTime(initialData.productionTime)
      setPrice(initialData.price)
    }
  }, [initialData, mode])

  // 4. Manejador para el envío del formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Creamos el objeto con los datos del formulario.
    const payload = {
      code,
      name,
      description,
      productBrief,
      materials,
      productionTime,
      price: Number(price), // Aseguramos que el precio sea un número.
    }

    // Determinamos el endpoint y el método HTTP según el modo.
    const endpoint =
      mode === 'edit' ? `/api/products/${initialData?.id}` : '/api/products'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        onSuccess() // Llamamos a onSuccess si la petición fue exitosa.
      } else {
        // En un caso real, aquí se manejaría el error de forma más elegante.
        console.error('Error al guardar el producto')
        alert('Error al guardar el producto')
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error)
      alert('Error de red o de servidor. Inténtalo de nuevo.')
    }
  }

  // 5. Renderizamos el formulario JSX.
  return (
    <form onSubmit={handleSubmit} className="userForm productForm">
      <label>
        Código:
        <input value={code} onChange={(e) => setCode(e.target.value)} required />
      </label>
      <label>
        Nombre:
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Descripción breve:
        <textarea value={productBrief} onChange={(e) => setProductBrief(e.target.value)} />
      </label>
      <label>
        Descripción completa:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </label>
      <label>
        Materiales:
        <input value={materials} onChange={(e) => setMaterials(e.target.value)} />
      </label>
      <label>
        Tiempo de producción:
        <input value={productionTime} onChange={(e) => setProductionTime(e.target.value)} />
      </label>
      <label>
        Precio (MXN):
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit">
        {mode === 'edit' ? 'Guardar cambios' : 'Crear producto'}
      </button>
    </form>
  )
}
