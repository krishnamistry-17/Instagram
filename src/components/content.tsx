import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { MdFavoriteBorder } from "react-icons/md"
import { MdFavorite } from "react-icons/md"
import {
  IoChatbubbleOutline,
  IoClose,
  IoEllipsisHorizontal,
} from "react-icons/io5"
import { FiSend } from "react-icons/fi"
import {
  FaCopy,
  FaFacebook,
  FaRegHeart,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"
import {
  FaRegBookmark,
  FaBookmark,
  FaRegTrashAlt,
  FaShare,
} from "react-icons/fa"
// import { toast } from "react-toastify"
import ProfileButton from "./profilebutton"

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
      {
        id: 3,
        userName: "carol",
        location: "Los Angeles, CA",
        likes: 56,
        caption: "A beautiful day in the park",
        time: "12 hours ago",
      },
    ])
  }, [])
  const [isLiked, setisLiked] = React.useState(false)
  const [isSaved, setIsSaved] = React.useState(false)
  const [ShareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
  const [openMenuPostId, setOpenMenuPostId] = React.useState<number | null>(
    null
  )
  const menuRef = React.useRef<HTMLDivElement | null>(null)
  const [isDoubleClicked, setIsDoubleClicked] = React.useState(false)

  const toggleLike = () => {
    setisLiked(prev => !prev)
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

  const postImages = (userName: string) => {
    if (userName === "alice") {
      return (
        <StaticImage
          src="../images/image2.png"
          alt="post image"
          className="w-full h-auto"
        />
      )
    }
    if (userName === "bob") {
      return (
        <StaticImage
          src="../images/image3.png"
          alt="post image"
          className="w-full h-auto"
        />
      )
    }
    if (userName === "carol") {
      return (
        <StaticImage
          src="../images/image4.png"
          alt="post image"
          className="w-full h-auto"
        />
      )
    }
    return (
      <StaticImage
        src="../images/image1.png"
        alt="post image"
        className="w-full h-auto"
      />
    )
  }

  return (
    <section className="flex flex-col gap-6">
      {posts?.map(item => {
        return (
          <article
            key={item.id}
            className="bg-white/80 border border-gray-200/70 rounded-md md:rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
          >
            <header className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProfileButton name={item?.userName} size="lg" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold">{item.userName}</p>
                  <p className="text-[11px] text-gray-500">{item.location}</p>
                </div>
              </div>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100 active:scale-95 transition focus:outline-none focus:ring-0"
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
                  className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded focus:outline-none focus:ring-0"
                  onClick={() => {
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaCopy className="w-4 h-4" />
                  Copy link
                </button>
                <button
                  role="menuitem"
                  className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 rounded"
                  onClick={() => {
                    setShareDialogOpen(true)
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaShare className="w-4 h-4" />
                  Share
                </button>
                <button
                  role="menuitem"
                  className="w-full px-3 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50 rounded"
                  onClick={() => {
                    setOpenDeleteModal(true)
                    setOpenMenuPostId(null)
                  }}
                >
                  <FaRegTrashAlt className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
            <div className="bg-black/5">
              {postImages(item?.userName)}
              {isDoubleClicked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <FaRegHeart className="w-10 h-10 text-red-700 animate-pulse" />
                </div>
              )}
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleLike}
                    aria-pressed={isLiked}
                    className="p-1 rounded hover:bg-gray-100 active:scale-95 transition"
                  >
                    {isLiked ? (
                      <MdFavorite className="w-5 h-5 text-red-500" />
                    ) : (
                      <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
                    )}
                  </button>

                  <button className="p-1 rounded hover:bg-gray-100 active:scale-95 transition">
                    <IoChatbubbleOutline className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100 active:scale-95 transition">
                    <FiSend className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                <div>
                  <button
                    onClick={toggleSave}
                    aria-pressed={isSaved}
                    className="p-1 rounded hover:bg-gray-100 active:scale-95 transition"
                  >
                    {isSaved ? (
                      <FaBookmark className="w-4 h-4 text-blue-600" />
                    ) : (
                      <FaRegBookmark className="w-4 h-4 text-gray-700" />
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
            {ShareDialogOpen && (
              <div className=" fixed inset-0 bg-black/20 backdrop-blur-[1px] z-50 ">
                <div
                  className="max-w-[400px] w-full h-fit bg-white rounded-md p-4 shadow-xs absolute 
                bottom-0 mx-auto
                sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Share</h2>
                    <button
                      className="text-gray-700"
                      onClick={() => setShareDialogOpen(false)}
                    >
                      <IoClose className="w-6 h-6 " />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Share this post with your friends
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <FaFacebook className="w-9 h-5 text-blue-600" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <FaTwitter className="w-9 h-5 text-sky-500" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                      <FaWhatsapp className="w-9 h-5 text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {openDeleteModal && (
              <div className=" fixed inset-0 bg-black/20 backdrop-blur-[1px] z-50 ">
                <div
                  className="max-w-[400px] w-full h-fit bg-white rounded-md p-4 shadow-xs absolute 
                bottom-0 mx-auto
                sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Delete Post</h2>
                    <button
                      className="text-gray-700"
                      onClick={() => setOpenDeleteModal(false)}
                    >
                      <IoClose className="w-6 h-6 " />
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this post?
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                      onClick={() => {
                        handleDeletePost(item?.id)
                        setOpenDeleteModal(false)
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="w-full border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
                      onClick={() => setOpenDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}

export default Content
