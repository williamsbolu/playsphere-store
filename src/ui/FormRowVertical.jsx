function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={children.props.id} className="text-sm">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-sm text-[#FD1D29]">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
