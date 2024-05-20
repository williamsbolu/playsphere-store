import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { Link } from 'react-router-dom';

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState(null);

  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, children }) {
  const { open, close, openId, setPosition } = useContext(MenuContext);

  function handleClick(e) {
    e.stopPropagation(); // stop the event propagation, so it doesn't bubble up to the 'StyledList container' and runs the "useOutsideClick" hook
    console.log('Click');

    const rect = e.target.closest('button').getBoundingClientRect();
    // console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    }); // 😒

    // if none of the menu is open || if there is currently an open menu already but different from d clicked one
    openId === '' || openId !== id ? open(id) : close();
  }

  return cloneElement(children, { onClick: handleClick });
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext);

  if (position) {
    console.log(
      `right-${`[${Math.trunc(position.x)}px]`} top-${`[${Math.trunc(position.y)}px]`}`,
    );
    console.log(position.x);
    console.log(position.y);
    console.log(openId);
  }
  const ref = useOutsideClick(close, false);

  // if d currently openId is different from the list id
  if (openId !== id) return null;

  const positionX = `right-[${Math.ceil(position.x)}px]`;
  const positionY = `top-[${Math.ceil(position.y)}px]`;

  return createPortal(
    <div
      className={`fixed rounded-3xl bg-black shadow-md ${positionX} ${positionY}`}
      //   className={`fixed rounded-3xl bg-black shadow-md right-${`[76px]`} top-${`[59px]`}`}
      ref={ref}
    >
      {children}
    </div>,
    document.body,
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    // we conditionally call onClick because not all buttons will be click the onClick prop
    onClick?.();
    close();
  }

  return (
    <Link
      className="flex w-full items-center gap-4 px-6 py-3 text-left text-sm"
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
