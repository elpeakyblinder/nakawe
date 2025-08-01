'use client';
import { useState, useRef } from 'react';

interface AvatarUploaderProps {
    uploadUrl: string;
    onUploadComplete: (newUrl: string) => void;
}

export default function AvatarUploader({ uploadUrl, onUploadComplete }: AvatarUploaderProps) {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al subir la imagen.');
            }

            onUploadComplete(data.url);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept='image/*'
                onChange={handleFileChange}
                ref={inputFileRef}
                style={{ display: 'none' }}
            />
            <button onClick={() => inputFileRef.current?.click()} disabled={isLoading}>
                {isLoading ? 'Subiendo...' : 'Seleccionar Imagen'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}