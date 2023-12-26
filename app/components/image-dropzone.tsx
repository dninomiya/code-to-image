import { useApp } from '@/app/providers/app-provider';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageDropzone({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setImage } = useApp();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noClick: true,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  });

  useEffect(() => {
    if (acceptedFiles?.length > 0) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles, setImage]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
}
