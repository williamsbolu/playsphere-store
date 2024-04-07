import { useState, createContext, useContext, cloneElement } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';

export const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState(null);

  const close = () => setOpenName(null);
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  // we clone the button after passing the onClick prop
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, type, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  const modalStyles = {
    right: `fixed top-0 z-40 h-screen w-[28%] bg-white ${name === openName ? 'right-0' : '-right-[28%]'} transition-[right] duration-300 ease-in-out grid grid-rows-[min-content_1fr_min-content]`,
    left: `fixed left-0 top-0 z-40 h-screen w-1/4 bg-white ${!openName && '-left-1/4'} transition-[left] duration-300 ease-in-out`,
  };

  return (
    <>
      {createPortal(
        <div
          className={`fixed left-0 top-0 z-30 h-screen w-full bg-[#000000B3] ${name === openName ? 'visible opacity-100' : 'invisible opacity-0'} transition-[opacity] duration-300`}
        ></div>,
        document.body,
      )}
      {createPortal(
        <div className={modalStyles[type]} ref={name === openName ? ref : null}>
          {cloneElement(children, { onCloseModal: close })}
        </div>,
        document.body,
      )}
    </>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// About the ref logic, we dont pass in the useOutsideClick hook to ref, unless it is the right window to be rendered to prevent calling the close handler everytime
