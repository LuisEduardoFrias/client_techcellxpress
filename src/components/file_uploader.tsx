//
'use client'
import React from 'react'
import 'st/file_uploader.css'

type TFileUpdateProps = {
  handler: (body: any) => void
}

export default function FileUploader({ handler }: TFileUpdateProps) {

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const data = await file.text();

        handler(JSON.parse(data));

      } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
      }
    }
  };

  return (
    <label className="custom-button">
      Cargar Archivo JSON
      <input id="filejson" type="file" onChange={handleFileUpload} accept="|.json" />
    </label>
  );
};

