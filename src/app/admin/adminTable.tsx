'use client'

import { JSX, useEffect, useState } from 'react'
import Image from 'next/image'
import './admin.css'

type Props<T> = {
  columns: string[]
  fetchUrl: string
  renderRow: (item: T, onEdit: (item: T) => void, onDelete: (id: string) => void) => JSX.Element
  formTitle: string
  renderForm: (options: {
    mode: 'create' | 'edit'
    initialData?: T
    onSuccess: () => void
    onClose: () => void
  }) => JSX.Element
  newTrigger?: number
}

export default function AdminTable<T extends { id: string }>({
  columns,
  fetchUrl,
  renderRow,
  formTitle,
  renderForm,
  newTrigger,
}: Props<T>) {
  const [items, setItems] = useState<T[]>([])
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')

  const fetchItems = async () => {
    try {
      const res = await fetch(fetchUrl)
      const data = await res.json()
      
      if (Array.isArray(data)) {
        setItems(data)
      } else {
        console.error("La respuesta de la API no es un array:", data);
        setItems([])
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setItems([]) // En caso de un error de red, también se asegura un array vacío.
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleNew = () => {
    setSelectedItem(null)
    setFormMode('create')
    setShowForm(true)
  }

  useEffect(() => {
    if (newTrigger && newTrigger > 0) {
      handleNew()
    }
  }, [newTrigger])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro que quieres eliminar este elemento?')
    if (!confirmed) return

    const res = await fetch(`${fetchUrl}/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setItems(prev => prev.filter(item => item.id !== id))
    } else {
      alert('Error al eliminar elemento')
    }
  }

  const handleEdit = (item: T) => {
    setSelectedItem(item)
    setFormMode('edit')
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setSelectedItem(null)
  }

  return (
    <div className="tablaContainer">
      <table className="tablaPerfiles">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(item => renderRow(item, handleEdit, handleDelete))}
        </tbody>
      </table>

      {showForm && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{formMode === 'edit' ? `Editar ${formTitle}` : `Nuevo ${formTitle}`}</h2>
            {renderForm({
              mode: formMode,
              initialData: selectedItem ?? undefined,
              onSuccess: () => {
                closeForm()
                fetchItems()
              },
              onClose: closeForm,
            })}
            <button className="cerrarBtn" onClick={closeForm}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  )
}
