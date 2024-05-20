import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../hooks/useOutsideClick';

const ModalContext = createContext();

function ModalContainer({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // we clone the button after passing the onClick prop "onClick("cabin-form")"
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  // if the name is equal to the currently opened window
  return createPortal(
    <div className="fixed left-0 top-0 z-30 h-screen w-full bg-[#000000B3] transition-all duration-500">
      <div
        ref={ref}
        className={`p-30 fixed left-2/4 top-2/4 z-40 max-h-[80vh] -translate-x-2/4 -translate-y-2/4 overflow-y-auto rounded-[3px] bg-white shadow-lg transition-all duration-500`}
      >
        <button
          onClick={close}
          className="absolute right-6 top-3 rounded-md border-none bg-none p-1"
        >
          <HiXMark className="h-6 w-6 text-[#1F1F1F]" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

// 4. Add child components as properties to parent components
ModalContainer.Open = Open;
ModalContainer.Window = Window;

export default ModalContainer;
