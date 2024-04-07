import { createPortal } from 'react-dom';

function SpinnerFull() {
  return createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white">
      {/* <div className="animate-fadeInBottom absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6"> */}
      <div className="flex animate-fadeInBottom flex-col items-center gap-6">
        <img src="/logo.png" className="block h-[70px]" alt="playsphere logo" />
        <div className="loader-full"></div>
      </div>
    </div>,
    document.body,
  );
}

export default SpinnerFull;
