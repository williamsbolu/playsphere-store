import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

function Empty() {
  const navigate = useNavigate();
  const searchInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const enteredSearchValue = searchInputRef.current.value;

    if (enteredSearchValue.length >= 2)
      navigate(`/search?q=${enteredSearchValue}`);
  }

  return (
    <section className="app-container py-36">
      <div className="text-center text-[#1F1F1F]">
        <p className="mb-[15px] font-heading text-[28px] font-medium">
          Products unavailable
        </p>
        <p className="text-[15px]">No data to show at the moment.</p>

        <form className="mx-auto mb-6 mt-10 max-w-md" onSubmit={handleSubmit}>
          <div className="flex items-center rounded-[3px] border border-[#d4d6d8]">
            <input
              type="search"
              className="grow rounded-[3px] border-solid px-5 py-[10px] font-sans text-sm shadow-sm placeholder:font-sans placeholder:text-[14px] placeholder:text-stone-500 focus:outline-none"
              placeholder="Search in store..."
              ref={searchInputRef}
            />
            <button className="grid items-center self-stretch rounded-e-[3px] bg-primary px-3">
              <FiSearch className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>

        <Link
          to="/"
          className="mt-2 text-[15px] font-normal text-primary hover:underline"
        >
          Click here to continue shopping
        </Link>
      </div>
    </section>
  );
}

export default Empty;
