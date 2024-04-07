import { Link } from 'react-router-dom';

function Button({
  children,
  onClick,
  disabled,
  style = 'primary',
  type,
  to,
  additionalClass,
}) {
  const btnStyles = {
    primary: 'bg-primary hover:bg-[#101010]',
    secondary: 'bg-[#101010] hover:bg-primary',
  };

  if (type === 'link') {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`inline-block rounded-3xl px-8 py-[10px] text-center text-sm font-medium text-white transition-all duration-200 disabled:cursor-not-allowed ${btnStyles[style]} ${additionalClass && additionalClass}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`h-10 rounded-3xl px-8 py-2 text-sm font-medium text-white transition-all duration-200 disabled:cursor-not-allowed ${btnStyles[style]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
