import { Link } from "gatsby"

import { FaHeart, FaHome } from "react-icons/fa"
import * as React from "react"
import { IoAdd, IoSearch } from "react-icons/io5"
import { MdFavoriteBorder } from "react-icons/md"
import ProfileButton from "./profilebutton"
import SearchMenu from "./searchMenu"
import UploadModal from "./uploadModal"
import { useStory } from "../context/storyContext"

const BottomMenu: React.FC = () => {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const { isStoryUpload, setIsStoryUpload } = useStory()
  const toggleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setSearchOpen(!searchOpen)
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 sm:hidden z-50 
    bg-white shadow-lg px-3 py-3"
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <FaHome className="text-xl " />
        </Link>
        <button type="button" aria-label="Search" onClick={toggleSearch}>
          <IoSearch className="text-xl " />
        </button>
        <button
          className="border rounded-sm"
          onClick={() => setIsStoryUpload(true)}
          aria-label="Upload"
        >
          <IoAdd className="text-xl" />
        </button>
        <Link to="/favorites">
          <MdFavoriteBorder className="text-xl" />
        </Link>
        <Link to="/profile">
          <ProfileButton name="you" size="sm" isBottomMenu={true} />
        </Link>
      </div>
      {searchOpen && (
        <SearchMenu isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      )}
      {isStoryUpload && <UploadModal />}
    </div>
  )
}

export default BottomMenu
