'use client'

import { useState, useEffect } from 'react'
import '../admin.css'

// Tipos para los datos que se usarán en el formulario.
type Artisan = {
  id: string;
  display_name: string;
}

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

type Props = {
  mode: 'create' | 'edit'
  initialData?: Collection
  onSuccess: () => void
}

export default function CollectionsForm({ mode, initialData, onSuccess }: Props) {
  // Estados para los campos del formulario.
  const [artisanId, setArtisanId] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const [designConcept, setDesignConcept] = useState('')
  const [designHistory, setDesignHistory] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')

  // Estados para cargar la lista de artesanos.
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [isLoadingArtisans, setIsLoadingArtisans] = useState(true)

  // Rellena el formulario con datos iniciales en modo de edición.
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setArtisanId(initialData.artisan_id)
      setCode(initialData.code)
      setName(initialData.name)
      setDescription(initialData.description)
      setTargetMarket(initialData.target_market)
      setDesignConcept(initialData.design_concept)
      setDesignHistory(initialData.design_history)
      setCoverImageUrl(initialData.cover_image_url)
    }
  }, [initialData, mode])

  // Obtiene la lista de artesanos para el menú desplegable.
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await fetch('/api/data/artisans');
        if (res.ok) {
          const data = await res.json();
          setArtisans(data);
        } else {
          console.error('Error al cargar los artesanos');
        }
      } catch (error) {
        console.error('Error de red al cargar artesanos:', error);
      } finally {
        setIsLoadingArtisans(false);
      }
    };
    fetchArtisans();
  }, []);

  // Manejador para el envío del formulario.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      artisan_id: artisanId,
      code,
      name,
      description,
      target_market: targetMarket,
      design_concept: designConcept,
      design_history: designHistory,
      cover_image_url: coverImageUrl,
    }

    const endpoint =
      mode === 'edit' ? `/api/data/collections/${initialData?.id}` : '/api/data/collections'
    const method = mode === 'edit' ? 'PUT' : 'POST'

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        onSuccess()
      } else {
        alert('Error al guardar la colección')
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error)
      alert('Error de red o de servidor.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userForm collectionForm">
      <label>
        Artesano:
        <select value={artisanId} onChange={(e) => setArtisanId(e.target.value)} required disabled={isLoadingArtisans}>
          <option value="" disabled>
            {isLoadingArtisans ? 'Cargando artesanos...' : 'Selecciona un artesano'}
          </option>
          {artisans.map(artisan => (
            <option key={artisan.id} value={artisan.id}>
              {artisan.display_name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Código:
        <input value={code} onChange={(e) => setCode(e.target.value)} required />
      </label>
      <label>
        Nombre de la Colección:
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>
      <label>
        Mercado Objetivo:
        <textarea value={targetMarket} onChange={(e) => setTargetMarket(e.target.value)} rows={2} />
      </label>
      <label>
        Concepto de Diseño:
        <textarea value={designConcept} onChange={(e) => setDesignConcept(e.target.value)} rows={3} />
      </label>
      <label>
        Historia del Diseño:
        <textarea value={designHistory} onChange={(e) => setDesignHistory(e.target.value)} rows={3} />
      </label>
      <label>
        URL de la Imagen de Portada:
        <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} />
      </label>
      <button type="submit">
        {mode === 'edit' ? 'Guardar cambios' : 'Crear colección'}
      </button>
    </form>
  )
}
