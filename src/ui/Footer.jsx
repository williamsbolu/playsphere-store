import { TbPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { TiSocialFacebook } from 'react-icons/ti';
import { RiTwitterFill } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaYoutube } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa';
import Button from './Button';
import ShoppingInfo from './ShoppingInfo';

function Footer() {
  const FooterLinkStyles =
    'hover:text-primary transition-all duration-200 block text-[15px] text-body font-medium';
  const FooterListStyles = 'transition-all duration-200';

  return (
    <>
      <ShoppingInfo />
      <footer className="bg-[#F3F5F6]">
        <section className="app-container border-[#e1e3e4 ] grid grid-cols-[2fr__1fr_1fr] gap-14 border-t border-solid py-12">
          <div className="space-y-4">
            <div className="">
              <h2 className="text-sm font-semibold uppercase text-primary">
                About Playsphere
              </h2>
              <button className="hidden">
                <TbPlus className="txext-black h-7 w-7" />
              </button>
            </div>

            <div className="text-body text-[15px] leading-7">
              <p>
                PlaySphere is your ultimate destination for all things gaming.
                As a specialized{' '}
                <span className="font-bold">online game store</span>, PlaySphere
                offers a vast array of{' '}
                <span className="font-bold">video games</span>,{' '}
                <span className="font-bold">consoles</span>,{' '}
                <span className="font-bold">accessories</span>,{' '}
                <span className="font-bold">and related items.</span> Whether
                you're a seasoned gamer or just starting your journey,
                PlaySphere provides a one-stop shop for all your gaming needs.
                With a wide selection and convenient{' '}
                <span className="font-bold">online shopping experience</span>,
                PlaySphere is the go-to destination for gamers everywhere.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="">
              <h2 className="text-sm font-semibold uppercase text-primary">
                Informations
              </h2>
              <button className="hidden">
                <TbPlus className="txext-black h-7 w-7" />
              </button>
            </div>
            <div className="">
              <ul className="space-y-3 text-sm">
                <li className={FooterListStyles}>
                  <Link to="/contact" className={FooterLinkStyles}>
                    Contact Us
                  </Link>
                </li>
                <li className={FooterListStyles}>
                  <Link to="/contact" className={FooterLinkStyles}>
                    Terms of service
                  </Link>
                </li>
                <li className={FooterListStyles}>
                  <Link className={FooterLinkStyles}>Refund policy</Link>
                </li>
                <li className={FooterListStyles}>
                  <Link to="/contact" className={FooterLinkStyles}>
                    Shipping Policy
                  </Link>
                </li>
                <li className={FooterListStyles}>
                  <Link to="/contact" className={FooterLinkStyles}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="">
              <h2 className="text-sm font-semibold uppercase text-primary">
                Newsletter
              </h2>
              <button className="hidden">
                <TbPlus className="txext-black h-7 w-7" />
              </button>
            </div>

            <div className="space-y-4 text-sm leading-7">
              <p className=" text-body text-[15px] leading-7">
                Stay updated with our promotions, new products and new stocks
                arrivals, directly to your inbox.
              </p>
              <form className=" space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-[3px] border border-[#d4d6d8] bg-white px-5 py-2 text-black placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </section>

        <section className="app-container flex items-center justify-between pb-10 pt-2">
          <p className="text-body text-[13px] font-semibold uppercase">
            &copy; Playsphere Game Store
          </p>

          <div className="space-y-3">
            <p className="text-body text-[13px]">Follow Us</p>

            <div className=" space-x-2">
              <Link
                to=""
                className="inline-block rounded-full bg-gray-400/75 p-[7px] transition-all duration-300 hover:bg-[#1877F2]"
              >
                <TiSocialFacebook className="h-4 w-4 text-white" />
              </Link>
              <Link
                to=""
                className="inline-block rounded-full bg-gray-400/75 p-[7px] transition-all duration-300 hover:bg-[#1DA1F2]"
              >
                <RiTwitterFill className="h-4 w-4 text-white" />
              </Link>
              <Link
                to=""
                className="inline-block rounded-full bg-gray-400/75 p-[7px] transition-all duration-300 hover:bg-[#C13584]"
              >
                <IoLogoInstagram className="h-4 w-4 text-white" />
              </Link>
              <Link
                to=""
                className="inline-block rounded-full bg-gray-400/75 p-[7px] transition-all duration-300 hover:bg-[#FF0000]"
              >
                <FaYoutube className="h-4 w-4 text-white" />
              </Link>
              <Link
                to=""
                className="inline-block rounded-full bg-gray-400/75 p-[7px] transition-all duration-300 hover:bg-[#0077B5]"
              >
                <FaLinkedinIn className="h-4 w-4 text-white" />
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
