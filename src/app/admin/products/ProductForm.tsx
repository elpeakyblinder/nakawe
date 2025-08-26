'use client'

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { type Product } from '@/types';
import ImageUploader, { type ImageUploaderHandles } from '@/components/features/profile/ImageUploader';

type SelectOption = {
  id: string;
  name: string;
};

type Props = {
  mode: 'create' | 'edit';
  initialData?: Product;
  onSuccess: () => void;
};

type ArtisanApiResponse = {
  id: string;
  display_name: string;
};


export default function ProductForm({ mode, initialData, onSuccess }: Props) {
  const uploaderRef = useRef<ImageUploaderHandles>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    productBrief: '',
    materials: '',
    productionTime: '',
    origin: '',
    price: 0,
    stock: 0,
    artisan_id: '',
    collection_id: '',
    category_id: '',
  });

  const [artisans, setArtisans] = useState<SelectOption[]>([]);
  const [collections, setCollections] = useState<SelectOption[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        code: initialData.code ?? '',
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        productBrief: initialData.product_brief ?? '',
        materials: initialData.materials ?? '',
        productionTime: initialData.production_time ?? '',
        origin: initialData.origin ?? '',
        price: initialData.price ?? 0,
        stock: initialData.stock ?? 0,
        artisan_id: initialData.artisan_id ?? '',
        collection_id: initialData.collection_id ?? '',
        category_id: initialData.category_id ?? '',
      });
    }
  }, [initialData, mode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artisansRes, collectionsRes, categoriesRes] = await Promise.all([
          fetch('/api/data/artisans'),
          fetch('/api/data/collections'),
          fetch('/api/data/categories')
        ]);

        if (artisansRes.ok) {
          const data: ArtisanApiResponse[] = await artisansRes.json();
          const mapped = data.map((artisan) => ({
            id: artisan.id,
            name: artisan.display_name.trim()
          }));
          setArtisans(mapped);
        }

        if (collectionsRes.ok) setCollections(await collectionsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());

      } catch (error) {
        toast.error('Error al cargar datos para el formulario.');
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newImageUrl = await uploaderRef.current?.upload();

      const payload = {
        code: formData.code,
        name: formData.name,
        description: formData.description,
        product_brief: formData.productBrief,
        materials: formData.materials,
        production_time: formData.productionTime,
        origin: formData.origin,
        price: Number(formData.price),
        stock: Number(formData.stock),
        artisan_id: formData.artisan_id,
        collection_id: formData.collection_id,
        category_id: formData.category_id,
        main_image_url: newImageUrl || initialData?.main_image_url || '',
      };

      const endpoint = mode === 'edit' ? `/api/products/${initialData?.id}` : '/api/products';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Ocurrió un error');
      }

      toast.success(`Producto ${mode === 'edit' ? 'actualizado' : 'creado'} con éxito.`);
      onSuccess();

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido.';
      toast.error(`Error al guardar: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      <div className="flex-1 overflow-y-auto px-2 py-6 space-y-15">

        {/* Sección 1: Información Básica */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Información Básica</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre del Producto
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="admin-input"
              />
            </div>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código (SKU)
              </label>
              <input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
                className="admin-input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="productBrief" className="block text-sm font-medium text-gray-700">
              Descripción Breve
            </label>
            <textarea
              id="productBrief"
              name="productBrief"
              value={formData.productBrief}
              onChange={handleInputChange}
              rows={3}
              className="admin-textarea"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción Completa
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="admin-textarea"
            />
          </div>
        </div>

        {/* Sección 2: Detalles */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Detalles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="materials" className="block text-sm font-medium text-gray-700">
                Materiales
              </label>
              <input
                id="materials"
                name="materials"
                value={formData.materials}
                onChange={handleInputChange}
                className="admin-input"
              />
            </div>
            <div>
              <label htmlFor="productionTime" className="block text-sm font-medium text-gray-700">
                Tiempo de producción
              </label>
              <input
                id="productionTime"
                name="productionTime"
                value={formData.productionTime}
                onChange={handleInputChange}
                className="admin-input whitespace-nowrap"
              />
            </div>
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                Origen
              </label>
              <input
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Organización */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Organización</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="artisan_id" className="block text-sm font-medium text-gray-700">
                Artesano
              </label>
              <select
                id="artisan_id"
                name="artisan_id"
                value={formData.artisan_id}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="">Por definir</option>
                {artisans.map(artisan => (
                  <option key={artisan.id} value={artisan.id}>
                    {artisan.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="collection_id" className="block text-sm font-medium text-gray-700">
                Colección
              </label>
              <select
                id="collection_id"
                name="collection_id"
                value={formData.collection_id}
                onChange={handleInputChange}
                required
                className="admin-select"
              >
                <option value="" disabled>
                  Selecciona una colección
                </option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="admin-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sección 4: Inventario */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Inventario</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio (MXN)
              </label>
              <input
                id="price"
                name="price"
                type="text"
                inputMode="decimal"
                pattern="[0-9.]*"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="admin-input"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
                className="admin-input"
              />
            </div>
          </div>
        </div>

        {/* Sección 5: Multimedia */}
        <div className="admin-form-section">
          <h3 className="admin-form-section-title">Multimedia</h3>
          <ImageUploader
            ref={uploaderRef}
            uploadUrl="/api/products/upload-image"
            formFieldName="productImage"
            initialImageUrl={initialData?.main_image_url}
            imageContainerClassName="w-full h-64 object-cover rounded-lg mt-1"
          />
        </div>

        
      </div>

      {/* Footer con botón fijo */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="admin-button"
        >
          {isLoading ? 'Guardando...' : (mode === 'edit' ? 'Guardar cambios' : 'Crear producto')}
        </button>
      </div>
    </form>
  );


}