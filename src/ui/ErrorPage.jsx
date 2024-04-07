import { PiArrowClockwiseFill } from 'react-icons/pi';

function ErrorPage({ refetch, type }) {
  return (
    <div
      className={`app-container flex justify-center ${type === 'full' ? ' py-36' : ' py-10'}`}
    >
      <button
        className="flex flex-col items-center gap-5 text-black"
        onClick={refetch}
      >
        <PiArrowClockwiseFill className="h-10 w-10" />
        <span className=" text-sm font-normal">
          Something went wrong! Coudn't load page content.
        </span>
      </button>
    </div>
  );
}

export default ErrorPage;
