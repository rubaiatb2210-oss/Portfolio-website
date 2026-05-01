import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');

  const setVariant = (variant, text = '') => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, setVariant, cursorText }}>
      {children}
    </CursorContext.Provider>
  );
};
