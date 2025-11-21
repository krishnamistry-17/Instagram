import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { MdFavoriteBorder } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import { IoChatbubbleOutline, IoEllipsisHorizontal } from "react-icons/io5"
import { FiSend } from "react-icons/fi"
import { FaCopy } from "react-icons/fa"
import {
  FaRegBookmark,
  FaBookmark,
  FaRegTrashAlt,
  FaShare,
} from "react-icons/fa"
import { toast } from "react-toastify"

const Content: React.FC = () => {
  const [posts, setPosts] = React.useState<
    {
      id: number
      userName: string
      location: string
      likes: number
      caption: string
      time: string
    }[]
  >([])
  React.useEffect(() => {
    setPosts([
      {
        id: 1,
        userName: "alice",
        location: "San Francisco, CA",
        likes: 128,
        caption:
          "Enjoying a sunny day exploring the city. #weekend #sunny #cityvibes",
        time: "2 hours ago",
      },
      {
        id: 2,
        userName: "bob",
        location: "New York, NY",
        likes: 89,
        caption: "Coffee and code",
        time: "6 hours ago",
      },
    ])
  }, [])
  const [isLiked, setisLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [openMenuPostId, setOpenMenuPostId] = React.useState<number | null>(
    null
  )
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  const toggleLike = () => {
    setisLiked(!isLiked)
    // toast.success("Liked")
  }
  const toggleSave = () => {
    setIsSaved(!isSaved)
    // toast.success("Saved to your list")
  }

  const handleDeletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }

  const handleMoreOptions = (id: number) => {
    setOpenMenuPostId(prev => (prev === id ? null : id))
  }

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuPostId(null)
      }
    }
    if (openMenuPostId !== null) {
      document.addEventListener("mousedown", onClickOutside)
    }
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [openMenuPostId])

  return (
    <section className="flex flex-col gap-6">
      {posts?.map(item => {
        return (
          <article
            key={item.id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden relative"
          >
            <header className="px-4 py-3 flex items-center justify-between">
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
                  <p className="text-sm font-semibold">{item.userName}</p>
                  <p className="text-[11px] text-gray-500">{item.location}</p>
                </div>
              </div>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100
                focus:outline-none focus:ring-0
                "
                onClick={() => handleMoreOptions(item?.id)}
                aria-haspopup="menu"
                aria-expanded={openMenuPostId === item.id}
                aria-controls={`post-menu-${item.id}`}
              >
                <IoEllipsisHorizontal className="w-4 h-4" />
              </button>
            </header>
            {openMenuPostId === item.id && (
              <div
                ref={menuRef}
                id={`post-menu-${item.id}`}
                role="menu"
                className="absolute top-12 right-3 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-50 w-44"
              >
                <button
                  role="menuitem"
                  className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(
                      // () => toast.success("Link copied"),
                      () => toast.error("Copy failed")
                    )
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaCopy className="w-4 h-4" />
                  Copy link
                </button>
                <button
                  role="menuitem"
                  className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50"
                  onClick={() => {
                    toast.info("Share dialog coming soon")
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaShare className="w-4 h-4" />
                  Share
                </button>
                <button
                  role="menuitem"
                  className="w-full px-3 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50"
                  onClick={() => {
                    handleDeletePost(item?.id)
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaRegTrashAlt className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <div className="bg-black/5">
              <StaticImage
                src="../images/image.png"
                alt="post image"
                className="w-full h-auto"
              />
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={toggleLike}>
                    {isLiked ? (
                      <MdFavorite className="w-5 h-5" />
                    ) : (
                      <MdFavoriteBorder className="w-5 h-5" />
                    )}
                  </button>

                  <IoChatbubbleOutline className="w-4 h-4" />
                  <FiSend className="w-4 h-4" />
                </div>
                <div>
                  <button onClick={toggleSave}>
                    {isSaved ? (
                      <FaBookmark className="w-4 h-4" />
                    ) : (
                      <FaRegBookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold">{item.likes} likes</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold mr-2">{item.userName}</span>
                {item.caption}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-wide text-gray-500">
                {item.time}
              </p>
            </div>
          </article>
        )
      })}
    </section>
  )
}

export default Content
