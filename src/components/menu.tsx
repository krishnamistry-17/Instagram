import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { RxCross2 } from "react-icons/rx"
import { navigate } from "gatsby"
import {
  MdExplore,
  MdFeed,
  MdMessage,
  MdNotifications,
  MdSettings,
} from "react-icons/md"
import ProfileButton from "./profilebutton"

const Menu: React.FC<{
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}> = ({ isMenuOpen, setIsMenuOpen }) => {
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

  const details = [
    { id: 1, icon: MdFeed, label: "Feed" },
    { id: 2, icon: MdNotifications, label: "Notifications" },
    { id: 3, icon: MdExplore, label: "Explore" },
    { id: 4, icon: MdMessage, label: "Message" },
    {
      id: 5,
      icon: MdSettings,
      label: "Settings",
      onClick: () => navigate("/setting"),
    },
  ]

  return (
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
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <ProfileButton />
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
          <div className="flex flex-col gap-2 items-center">
            <p className="text-md font-semibold">5</p>
            <p className="text-xs  font-semibold">Posts</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-md font-semibold">100</p>
            <p className="text-xs  font-semibold">Followers</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-md font-semibold">100</p>
            <p className="text-xs  font-semibold">Following</p>
          </div>
        </div>
        <nav className="px-5 py-4">
          <ul className="space-y-3">
            {details.map(item => (
              <li key={item.id}>
                <button
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-md p-2"
                  onClick={item.onClick}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
export default Menu
