'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ContextType = {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppContext = createContext({} as ContextType);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [image, setImage] = useState<string | null>('');

  useEffect(() => {
    async function handlePasteEvent(e: ClipboardEvent) {
      if (!e.clipboardData) return;

      const items = e.clipboardData.items;
      const item = items[0];

      if (item.type.indexOf('image') === 0) {
        e.preventDefault();
        const blob = item.getAsFile();

        if (!blob) return;

        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      }
    }

    document.addEventListener('paste', handlePasteEvent);

    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        image,
        setImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
