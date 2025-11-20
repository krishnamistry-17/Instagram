import * as React from "react"
import { Link } from "gatsby"
import { FaHouse } from "react-icons/fa6"
import { BsFillChatDotsFill } from "react-icons/bs"
import { MdFavoriteBorder } from "react-icons/md"
import { IoMdMenu } from "react-icons/io"
import { RxCross2 } from "react-icons/rx"
import { StaticImage } from "gatsby-plugin-image"
import { IoSearch } from "react-icons/io5"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  React.useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <header className="bg-white border-b border-gray-200 shadow-xs">
      <div className="mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          <Link to="/" className=" no-underline hover:opacity-80">
            Instagram
          </Link>
        </h1>
        <div className="relative w-56 md:w-72 h-9 flex items-center justify-center">
          <div
            className={`w-full h-full border border-gray-200 rounded-md px-3 flex items-center transition-opacity duration-200 ${
              isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none focus:ring-0"
            />
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
        <>
          <button
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          <aside
            role="dialog"
            aria-modal="true"
            className="fixed top-0 right-0 h-full w-80 bg-white border-l border-gray-200 z-50 shadow-xl transform transition-transform duration-300 translate-x-0"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-white p-[3px]">
                    <StaticImage
                      src="../images/image.png"
                      className="w-8 h-8 rounded-full object-cover"
                      alt="suggestion 1"
                    />
                  </div>
                </div>
                <div className="leading-tight">
                  <p className="text-md font-semibold">John Doe</p>
                  <p className="text-xs text-gray-500">@johndoe</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setIsMenuOpen(false)}
                className="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <RxCross2 className="text-xl" />
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">5</p>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">100</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-md font-semibold">100</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>
            <nav className="px-5 py-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chats"
                    className="block px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Chats
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Favorites
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
        </>
      )}
    </header>
  )
}

export default Header
