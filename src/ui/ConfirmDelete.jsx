function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <div className="flex w-[500px] flex-col gap-3 px-16 pb-7 pt-10">
      {/* <h3 className="font-heading text-lg font-medium">
        Delete {resourceName}
      </h3> */}
      <p className="mb-4 text-center font-heading text-sm font-medium text-[#1F1F1F]">
        Are you sure you want to delete this {resourceName}?
      </p>

      <div className="grid grid-cols-2 gap-7">
        <button
          disabled={disabled}
          onClick={onCloseModal}
          className="rounded-3xl border border-[#26282B] px-8 py-1 text-sm font-medium text-[#1F1F1F] disabled:cursor-not-allowed"
        >
          No
        </button>
        <button
          disabled={disabled}
          onClick={onConfirm}
          className="rounded-3xl bg-[#26282B] px-8 py-2 text-sm font-medium text-white disabled:cursor-not-allowed"
        >
          Yes
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
