'use client'

import { useState, useEffect, useRef } from 'react'
import ImageUploader, { type ImageUploaderHandles } from '@/components/features/profile/ImageUploader'

// Tipos (sin cambios)
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
  const uploaderRef = useRef<ImageUploaderHandles>(null)

  // Estados del formulario (sin cambios)
  const [artisanId, setArtisanId] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [targetMarket, setTargetMarket] = useState('')
  const [designConcept, setDesignConcept] = useState('')
  const [designHistory, setDesignHistory] = useState('')
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [isLoadingArtisans, setIsLoadingArtisans] = useState(true)

  // Lógica de useEffects (sin cambios)
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setArtisanId(initialData.artisan_id)
      setCode(initialData.code)
      setName(initialData.name)
      setDescription(initialData.description)
      setTargetMarket(initialData.target_market)
      setDesignConcept(initialData.design_concept)
      setDesignHistory(initialData.design_history)
    }
  }, [initialData, mode])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newCoverUrl = await uploaderRef.current?.upload();

      const payload = {
        artisan_id: artisanId,
        code,
        name,
        description,
        target_market: targetMarket,
        design_concept: designConcept,
        design_history: designHistory,
        cover_image_url: newCoverUrl || initialData?.cover_image_url || '',
      }

      const endpoint =
        mode === 'edit' ? `/api/collections/${initialData?.id}` : '/api/collections'
      const method = mode === 'edit' ? 'PUT' : 'POST'

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const errorData = await res.json();
        alert(`Error al guardar la colección: ${errorData.error || res.statusText}`)
      }
    } catch (error) {
      console.error('Error en el envío del formulario:', error)
      const message = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
      alert(`Error en el envío: ${message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="artisan" className="block text-sm font-medium text-gray-700 mb-1">Artesano</label>
            <select
              id="artisan"
              value={artisanId}
              onChange={(e) => setArtisanId(e.target.value)}
              required
              disabled={isLoadingArtisans}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                {isLoadingArtisans ? 'Cargando artesanos...' : 'Selecciona un artesano'}
              </option>
              {artisans.map(artisan => (
                <option key={artisan.id} value={artisan.id}>
                  {artisan.display_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Código</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Colección</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen de Portada</label>
            <ImageUploader
              ref={uploaderRef}
              uploadUrl="/api/collections/upload-cover"
              formFieldName="collectionCover"
              initialImageUrl={initialData?.cover_image_url}
              altText="Portada de la colección"
              defaultImage="/default-cover-image.png"
              imageContainerClassName="w-full h-48 object-cover rounded-lg border-dashed border-2 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700 mb-1">Mercado Objetivo</label>
            <textarea
              id="targetMarket"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              rows={2}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="designConcept" className="block text-sm font-medium text-gray-700 mb-1">Concepto de Diseño</label>
            <textarea
              id="designConcept"
              value={designConcept}
              onChange={(e) => setDesignConcept(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="designHistory" className="block text-sm font-medium text-gray-700 mb-1">Historia del Diseño</label>
        <textarea
          id="designHistory"
          value={designHistory}
          onChange={(e) => setDesignHistory(e.target.value)}
          rows={4}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {mode === 'edit' ? 'Guardar Cambios' : 'Crear Colección'}
        </button>
      </div>
    </form>
  )
}
