import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

function Nav() {
  const navlink =
    'hover:text-primary transition-all duration-100 whitespace-nowrap text-black font-medium text-base';
  const navlinkIcon =
    'hover:text-primary flex items-center transition-all duration-100 py-4 whitespace-nowrap text-black font-medium text-base';
  const dropdown =
    'absolute top-[52px] hidden w-[290px] rounded-lg border-2 bg-white px-5 py-5 shadow-lg group-hover:block z-10';
  const accessoriesLinkStyles =
    'hover:text-primary block text-gray-500 transition-all duration-100';
  const videoGameLinkStyles =
    'hover:text-primary block whitespace-nowrap border-b pb-2 transition-all duration-100 text-black font-medium';
  const genreLinkStyles =
    'hover:text-primary block border-b py-2 transition-all duration-100';

  return (
    <nav className="border-b border-[#e7e2de] bg-white">
      <ul className="app-container text-body flex h-14 items-center gap-9 text-[15px] font-normal">
        <li>
          <Link to="/" className={navlink}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/product-category/deals" className={navlink}>
            Hot Deals
          </Link>
        </li>

        <li>
          <Link to="/product-category/gift-cards" className={navlink}>
            Gift Cards
          </Link>
        </li>

        <li className="group relative">
          <Link to="/product-category/playstation-4" className={navlinkIcon}>
            Playstation 4
            <MdOutlineKeyboardArrowDown className="ml-1 h-6 w-6 text-black group-hover:text-primary" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link
                  to="/product-category/playstation-4/ps4-consoles-and-accessories"
                  className={accessoriesLinkStyles}
                >
                  Playstation 4 Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/product-category/playstation-4/playstation-4-games"
                  className={videoGameLinkStyles}
                >
                  Playstation 4 Games
                </Link>

                <ul className="font-normal text-gray-500">
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Adventure
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Fighting
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="block py-2 transition-all duration-100 hover:text-primary"
                    >
                      Horror
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>

        <li className="group relative">
          <Link to="/product-category/playstation-5" className={navlinkIcon}>
            Playstation 5
            <MdOutlineKeyboardArrowDown className="ml-1 h-6 w-6 text-black group-hover:text-primary" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link
                  to="/product-category/playstation-5/ps5-consoles-and-accessories"
                  className={accessoriesLinkStyles}
                >
                  Playstation 5 Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/product-category/playstation-5/playstation-5-games"
                  className={videoGameLinkStyles}
                >
                  Playstation 5 Games
                </Link>

                <ul className="font-normal text-gray-500">
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Adventure
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Fighting
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="block py-2 transition-all duration-100 hover:text-primary"
                    >
                      Horror
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>

        <li className="group relative">
          <Link to="/product-category/xbox-one" className={navlinkIcon}>
            Xbox One
            <MdOutlineKeyboardArrowDown className="ml-1 h-6 w-6 text-black group-hover:text-primary" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link
                  to="/product-category/xbox-one/xbox-one-consoles-and-accessories"
                  className={accessoriesLinkStyles}
                >
                  Xbox One Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/product-category/xbox-one/xbox-one-games"
                  className={videoGameLinkStyles}
                >
                  Xbox One Games
                </Link>

                <ul className="font-normal text-gray-500">
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Adventure
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Fighting
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="block py-2 transition-all duration-100 hover:text-primary"
                    >
                      Horror
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>

        <li className="group relative">
          <Link to="/product-category/xbox-series-x" className={navlinkIcon}>
            Xbox Series X
            <MdOutlineKeyboardArrowDown className="ml-1 h-6 w-6 text-black group-hover:text-primary" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link
                  to="/product-category/xbox-series-x/xbox-series-x-consoles-and-accessories"
                  className={accessoriesLinkStyles}
                >
                  Xbox Series X Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/product-category/xbox-series-x/xbox-series-x-games"
                  className={videoGameLinkStyles}
                >
                  Xbox Series X Games
                </Link>

                <ul className="font-normal text-gray-500">
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Adventure
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Fighting
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="block py-2 transition-all duration-100 hover:text-primary"
                    >
                      Horror
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>

        <li className="group relative">
          <Link to="/product-category/nintendo-switch" className={navlinkIcon}>
            Nintendo Switch
            <MdOutlineKeyboardArrowDown className="ml-1 h-6 w-6 text-black group-hover:text-primary" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link
                  to="/product-category/nintendo-switch/nintendo-switch-consoles-and-accessories"
                  className={accessoriesLinkStyles}
                >
                  Nintendo Switch Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link
                  to="/product-category/nintendo-switch/nintendo-switch-games"
                  className={videoGameLinkStyles}
                >
                  Nintendo Switch Games
                </Link>

                <ul className="font-normal text-gray-500">
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Adventure
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Fighting
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Racing
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Shooter
                    </Link>
                  </li>
                  <li>
                    <Link to="" className={genreLinkStyles}>
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      className="block py-2 transition-all duration-100 hover:text-primary"
                    >
                      Horror
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
