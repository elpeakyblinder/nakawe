'use client'

import Image from 'next/image'
import React from 'react'

// Definimos los tipos para las props que el componente recibirá.
type Props = {
  mainTitle: string
  title: string
  description: string
  searchPlaceholder: string
  buttonText: string
  onNew: () => void // Función que se ejecutará al hacer clic en el botón "Nuevo".
}

export default function AdminFunctions({
  mainTitle,
  title,
  description,
  searchPlaceholder,
  buttonText,
  onNew,
}: Props) {
  return (
    <>
      {/* Título principal del panel */}
      <h2>{mainTitle}</h2>

      <hr />

      {/* Título y descripción específicos del módulo actual (ej. Usuarios, Productos) */}
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Contenedor para los botones de acción y búsqueda */}
      <div className="panelAdminButtonsOptions">
        <input type="text" placeholder={searchPlaceholder} />
        <button>
          <Image src={'/iconos/filter.svg'} alt="filter icon" width={20} height={20} />
          Filtros
        </button>
        <button>
          <Image src={'/iconos/export.svg'} alt="export icon" width={20} height={20} />
          Exportar
        </button>
        {/* El botón "Nuevo" utiliza el texto y la función pasados por props */}
        <button onClick={onNew}>
          <Image src={'/iconos/add.svg'} alt="add icon" width={20} height={20} />
          {buttonText}
        </button>
      </div>
    </>
  )
}
