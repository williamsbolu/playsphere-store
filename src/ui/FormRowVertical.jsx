function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={children.props.id} className="ml-1 text-sm text-black ">
          {label}
          <span className="font-medium text-[#FD353F]">*</span>
        </label>
      )}
      {children}
      {error && <span className="ml-2 text-sm text-[#FD1D29]">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
