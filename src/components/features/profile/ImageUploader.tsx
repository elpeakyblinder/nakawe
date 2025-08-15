'use client';

import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import Image from 'next/image';

// Interfaces y tipos
export interface ImageUploaderHandles {
    upload: (additionalData?: Record<string, string>) => Promise<string | null>;
}

interface ImageUploaderProps {
    uploadUrl: string;
    formFieldName: string;
    initialImageUrl?: string;
    defaultImage?: string;
    altText?: string;
    className?: string;
    imageContainerClassName?: string;
}

const ImageUploader = forwardRef<ImageUploaderHandles, ImageUploaderProps>(
    (
        {
            uploadUrl,
            formFieldName,
            initialImageUrl,
            defaultImage = '/default-placeholder.png',
            altText = 'Vista previa de la imagen',
            className = '',
            imageContainerClassName = 'w-48 h-48 rounded-full',
        },
        ref
    ) => {
        const inputFileRef = useRef<HTMLInputElement>(null);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);
        const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl || null);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState('');

        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setSelectedFile(file);
                const newPreviewUrl = URL.createObjectURL(file);
                setPreviewUrl(newPreviewUrl);
                setError('');
            }
        };

        useEffect(() => {
            const currentPreview = previewUrl;
            return () => {
                if (currentPreview?.startsWith('blob:')) {
                    URL.revokeObjectURL(currentPreview);
                }
            };
        }, [previewUrl]);

        useImperativeHandle(ref, () => ({
            async upload(additionalData) {
                if (!selectedFile) {
                    return null;
                }

                setIsLoading(true);
                setError('');

                const formData = new FormData();
                formData.append(formFieldName, selectedFile, selectedFile.name);

                if (additionalData) {
                    for (const key in additionalData) {
                        formData.append(key, additionalData[key]);
                    }
                }

                try {
                    const response = await fetch(uploadUrl, {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await response.json();
                    if (!response.ok) {
                        throw new Error(result.error || `Error HTTP ${response.status}`);
                    }
                    return result.url;
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
                    setError(message);
                    console.error(`Error al subir la imagen a ${uploadUrl}:`, err);
                    return null;
                } finally {
                    setIsLoading(false);
                }
            },
        }));

        return (
            <div className={`flex flex-col items-center gap-4 ${className}`}>
                <div
                className={`relative overflow-hidden border-2 ${imageContainerClassName}`}
                style={{ borderColor: error ? 'red' : '#ccc' }}
                >
                <Image
                    src={previewUrl || defaultImage}
                    alt={altText}
                    className="object-cover w-full h-full"
                    fill
                    sizes="100vw"
                />
                </div>

                <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/webp"
                    onChange={handleFileChange}
                    ref={inputFileRef}
                    style={{ display: 'none' }}
                    aria-hidden="true"
                />

                <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    disabled={isLoading}
                    className="px-4 py-2 font-semibold text-black bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isLoading ? 'Subiendo...' : 'Seleccionar Imagen'}
                </button>

                {error && <p className="m-0 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

ImageUploader.displayName = 'ImageUploader';
export default ImageUploader;