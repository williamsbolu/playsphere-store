import { Link } from 'react-router-dom';

function Button({
  children,
  onClick,
  disabled,
  variation = 'primary',
  type,
  to,
  additionalClass,
  isCheckout,
}) {
  const btnStyles = {
    primary: 'bg-primary hover:bg-[#101010] text-white',
    secondary: 'bg-[#101010] hover:bg-primary text-white',
    transparent:
      'border border-solid border-[#e1e3e4] bg-transparent text-primary hover:bg-[#e1e3e47f]',
    soldout: 'bg-[#8a9297] text-white',
    delete: 'bg-[#101010] text-white',
  };

  if (type === 'link') {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`inline-block rounded-[3px] px-8 py-[10px] text-center text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed ${btnStyles[variation]} ${additionalClass && additionalClass}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`rounded-[3px] px-8 py-[10px] text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed ${btnStyles[variation]} ${additionalClass && additionalClass} disabled:cursor-not-allowed ${isCheckout && 'shadow-sm disabled:bg-stone-400/40'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
