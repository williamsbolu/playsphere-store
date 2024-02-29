import { Link } from 'react-router-dom';

function Product() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4 border border-[#e7e2de] px-5 py-7">
      <Link className="inline-block">
        <img
          src="/button-4628422_640.jpg"
          className="block h-[110px] w-[110px]"
          alt=""
        />
      </Link>

      <div>
        <Link
          to=""
          className="mb-3 block text-[15px] font-medium text-[#26282B] hover:text-secondary"
        >
          Xbox One Wireless Controller White
        </Link>
        <span className="block text-[15px] font-medium text-secondary">
          ₦548,999
        </span>
      </div>
    </div>
  );
}

export default Product;
