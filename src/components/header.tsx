import * as React from "react"
import { Link } from "gatsby"
import { FaHouse } from "react-icons/fa6"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MdFavoriteBorder } from "react-icons/md"
import { IoMdMenu } from "react-icons/io"
import { StaticImage } from "gatsby-plugin-image"
import { IoSearch } from "react-icons/io5"
import Menu from "./menu"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-xs">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          {" "}
          <StaticImage
            src="../images/logo.png"
            className="w-8 h-8 "
            alt="logo"
          />
        </Link>
        <div className="flex-1 sm:flex hidden justify-center px-4">
          <div
            className={`relative w-full max-w-md transition-all duration-200 
              ${
                isSearchOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none -translate-y-1"
              }
            `}
          >
            <div
              className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur 
            px-3 py-2 ring-1 ring-gray-200 focus-within:ring-gray-300 shadow-sm"
            >
              <IoSearch className="w-4 h-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className=" md:block hidden"
          >
            <IoSearch className="w-5 h-5" />
          </button>
          <Link to="/" className=" ">
            <FaHouse className="text-md" />
          </Link>
          <Link to="/chats" className=" ">
            <BsFillChatDotsFill className="text-md" />
          </Link>
          <Link to="/favorites" className=" ">
            <MdFavoriteBorder className="text-xl" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <IoMdMenu className="text-xl" />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </header>
  )
}

export default Header
