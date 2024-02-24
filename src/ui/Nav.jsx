import { Link } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

function Nav() {
  const navlink =
    'hover:text-secondary transition-all duration-100 whitespace-nowrap';
  const navlinkIcon =
    'hover:text-secondary flex items-center transition-all duration-100 py-4 whitespace-nowrap';
  const dropdown =
    'absolute top-[52px] hidden w-[290px] rounded-lg border-2 bg-white px-5 py-5 shadow-lg group-hover:block z-10';
  const accessoriesLinkStyles =
    'hover:text-secondary block text-gray-500 transition-all duration-100';
  const videoGameLinkStyles =
    'hover:text-secondary block whitespace-nowrap border-b pb-2 transition-all duration-100';
  const genreLinkStyles =
    'hover:text-secondary block border-b py-2 transition-all duration-100';

  return (
    <nav className=" border-b border-[#e7e2de]">
      <ul className="container mx-auto flex h-14 items-center gap-9 bg-white px-10 text-[15px] font-normal text-black">
        <li>
          <Link className={navlink}>Home</Link>
        </li>

        <li>
          <Link className={navlink}>Hot Deals</Link>
        </li>

        <li>
          <Link className={navlink}>Gift Cards</Link>
        </li>

        <li className="group relative">
          <Link to="" className={navlinkIcon}>
            Playstation 4
            <MdOutlineKeyboardArrowDown className="group-hover:text-secondary ml-1 h-6 w-6 text-black" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link to="/console&ass" className={accessoriesLinkStyles}>
                  Playstation 4 Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link to="/games" className={videoGameLinkStyles}>
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
                      className="hover:text-secondary block py-2 transition-all duration-100"
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
          <Link to="" className={navlinkIcon}>
            Playstation 5
            <MdOutlineKeyboardArrowDown className="group-hover:text-secondary ml-1 h-6 w-6 text-black" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link to="/console&ass" className={accessoriesLinkStyles}>
                  Playstation 5 Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link to="/games" className={videoGameLinkStyles}>
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
                      className="hover:text-secondary block py-2 transition-all duration-100"
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
          <Link to="" className={navlinkIcon}>
            Xbox One
            <MdOutlineKeyboardArrowDown className="group-hover:text-secondary ml-1 h-6 w-6 text-black" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link to="/console&ass" className={accessoriesLinkStyles}>
                  Xbox One Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link to="/games" className={videoGameLinkStyles}>
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
                      className="hover:text-secondary block py-2 transition-all duration-100"
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
          <Link to="" className={navlinkIcon}>
            Xbox Series
            <MdOutlineKeyboardArrowDown className="group-hover:text-secondary ml-1 h-6 w-6 text-black" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link to="/console&ass" className={accessoriesLinkStyles}>
                  Xbox Series Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link to="/games" className={videoGameLinkStyles}>
                  Xbox Series Games
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
                      className="hover:text-secondary block py-2 transition-all duration-100"
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
          <Link to="" className={navlinkIcon}>
            Nintendo Switch
            <MdOutlineKeyboardArrowDown className="group-hover:text-secondary ml-1 h-6 w-6 text-black" />
          </Link>

          <div className={dropdown}>
            <ul className="flex">
              <li className="mr-auto w-[80px]">
                <Link to="/console&ass" className={accessoriesLinkStyles}>
                  Nintendo Switch Consoles & Accessories
                </Link>
              </li>

              <li>
                <Link to="/games" className={videoGameLinkStyles}>
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
                      className="hover:text-secondary block py-2 transition-all duration-100"
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
