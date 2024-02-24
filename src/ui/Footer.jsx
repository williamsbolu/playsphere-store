import { TbPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { TiSocialFacebook } from 'react-icons/ti';
import { RiTwitterFill } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaYoutube } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const FooterLinkStyles =
    'hover:text-secondary transition-all duration-200 block';
  const FooterListStyles = 'transition-all duration-200 hover:scale-105';

  return (
    <footer className="text-black">
      <section className="container mx-auto grid grid-cols-[1fr_1.5fr_1.3fr_1fr] gap-16 border-t border-stone-300/60 px-10 py-12">
        <div className="space-y-4">
          <div className="">
            <h2 className="text-[14px] font-medium uppercase">Main Menu</h2>
            <button className="hidden">
              <TbPlus className="txext-black h-7 w-7" />
            </button>
          </div>
          <div className="">
            <ul className="space-y-3 text-sm">
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Hot Deals</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Gift Cards</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Products</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Playstation 4</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Playstation 5</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Xbox One</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Xbox Series</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Nintendo</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="">
            <h2 className="text-[14px] font-medium uppercase">
              About Playsphere
            </h2>
            <button className="hidden">
              <TbPlus className="txext-black h-7 w-7" />
            </button>
          </div>

          <div className="text-sm leading-7">
            <p>
              Jamara is the people's retailer outlet. Our online store is truly
              a place for discovering the best home appliances and household
              accessories available now at an unbeatable prices in Nigeria. Our
              customers can count on us to expect the unexpected; we are fun,
              quirky, know how to add personality to everyday items, and add
              spice to your home. Browse through our TVs, air conditioners,
              refrigerators, gas cookers, freezers, washing machines and fans'
              offers. There is something for everyone.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="">
            <h2 className="text-[14px] font-medium uppercase">Newsletter</h2>
            <button className="hidden">
              <TbPlus className="txext-black h-7 w-7" />
            </button>
          </div>

          <div className="space-y-4 text-sm leading-7">
            <p>
              Stay updated with our promotions, new products and new stocks
              arrivals, directly to your inbox.
            </p>
            <form className=" space-y-3">
              <input
                type="email"
                required
                placeholder="Your email"
                className="focus:ring-primary w-full rounded-3xl border border-[#dcd5cf] px-5 py-2 text-black placeholder:text-sm focus:outline-none focus:ring-2"
              />

              <button className="bg-primary rounded-3xl px-8 py-2 text-[15px] font-medium text-white">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="">
            <h2 className="text-[14px] font-medium uppercase">Informations</h2>
            <button className="hidden">
              <TbPlus className="txext-black h-7 w-7" />
            </button>
          </div>
          <div className="">
            <ul className="space-y-3 text-sm">
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Private Policy</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>About Us</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Contact Us</Link>
              </li>
              <li className={FooterListStyles}>
                <Link className={FooterLinkStyles}>Wishlist</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container mx-auto flex items-center justify-between px-10 pb-10 pt-2">
        <p className="text-[13px] font-normal uppercase">
          &copy; Playsphere Game Store
        </p>

        <div className=" space-y-3">
          <p className=" text-[13px]">Follow Us</p>

          <div className=" space-x-2">
            <Link
              to=""
              className="inline-block rounded-full bg-stone-400 p-[7px] transition-all duration-300 hover:bg-[#1877F2]"
            >
              <TiSocialFacebook className="h-4 w-4 text-white" />
            </Link>
            <Link
              to=""
              className="inline-block rounded-full bg-stone-400 p-[7px] transition-all duration-300 hover:bg-[#1DA1F2]"
            >
              <RiTwitterFill className="h-4 w-4 text-white" />
            </Link>
            <Link
              to=""
              className="inline-block rounded-full bg-stone-400 p-[7px] transition-all duration-300 hover:bg-[#C13584]"
            >
              <IoLogoInstagram className="h-4 w-4 text-white" />
            </Link>
            <Link
              to=""
              className="inline-block rounded-full bg-stone-400 p-[7px] transition-all duration-300 hover:bg-[#FF0000]"
            >
              <FaYoutube className="h-4 w-4 text-white" />
            </Link>
            <Link
              to=""
              className="inline-block rounded-full bg-stone-400 p-[7px] transition-all duration-300 hover:bg-[#0077B5]"
            >
              <FaLinkedinIn className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
