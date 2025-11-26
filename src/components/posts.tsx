import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { FaImages, FaVideo } from "react-icons/fa"
import exampleVideo from "../images/videos/example.mp4"
import { IoEllipsisVertical } from "react-icons/io5"
import { FaCopy, FaShare, FaRegTrashAlt } from "react-icons/fa"
import { MenuItems } from "./menuitems"

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("posts")
  const [isClicked, setIsClicked] = React.useState(false)
  const videos = React.useMemo(
    () => [exampleVideo, exampleVideo, exampleVideo],
    []
  )
  const [postUsers, setPostUsers] = React.useState<string[]>([
    "alice",
    "bob",
    "carol",
  ])
  const [videoUsers, setVideoUsers] = React.useState<string[]>([
    "alice",
    "bob",
    "carol",
  ])
  const [openMenu, setOpenMenu] = React.useState<{
    type: "posts" | "videos"
    index: number
  } | null>(null)
  const menuRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const postImages = (userName: string) => {
    if (userName === "alice") {
      return (
        <StaticImage
          src="../images/image2.png"
          alt={userName}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )
    }
    if (userName === "bob") {
      return (
        <StaticImage
          src="../images/image3.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt={userName}
        />
      )
    }
    if (userName === "carol") {
      return (
        <StaticImage
          src="../images/image4.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt={userName}
        />
      )
    }
    return (
      <StaticImage
        src="../images/image1.png"
        alt={userName}
        className="absolute inset-0 w-full h-full object-cover"
      />
    )
  }

  const postVideos = (userName: string) => {
    if (userName === "alice") {
      return (
        <video
          src={videos[0]}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videos[0]} type="video/mp4" />
        </video>
      )
    }
    if (userName === "bob") {
      return (
        <video
          src={videos[1]}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videos[1]} type="video/mp4" />
        </video>
      )
    }
    if (userName === "carol") {
      return (
        <video
          src={videos[2]}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videos[2]} type="video/mp4" />
        </video>
      )
    }
  }

  const handleCopyLink = (type: "posts" | "videos", index: number) => {
    const link = `${window.location.origin}/profile?tab=${type}&i=${index}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).catch(() => {})
    }
    setOpenMenu(null)
  }
  const handleShare = (type: "posts" | "videos", index: number) => {
    const link = `${window.location.origin}/profile?tab=${type}&i=${index}`
    if (navigator.share) {
      navigator.share({ url: link, title: "Check this out" }).catch(() => {})
    } else {
      handleCopyLink(type, index)
    }
  }
  const handleDelete = (type: "posts" | "videos", index: number) => {
    if (type === "posts") {
      setPostUsers(prev => prev.filter((_, i) => i !== index))
    } else {
      setVideoUsers(prev => prev.filter((_, i) => i !== index))
    }
    setOpenMenu(null)
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4 items-center justify-center border-b border-gray-200 pb-2">
        <button
          className={`flex items-center gap-2 justify-center pb-2 border-b-2 transition-colors ${
            activeTab === "posts"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          aria-selected={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
        >
          <FaImages className="w-4 h-4" />
          <span className="text-sm font-semibold">Posts</span>
        </button>
        <button
          className={`flex items-center gap-2 justify-center pb-2 border-b-2 transition-colors ${
            activeTab === "videos"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          aria-selected={activeTab === "videos"}
          onClick={() => setActiveTab("videos")}
        >
          <FaVideo className="w-4 h-4" />
          <span className="text-sm font-semibold">Videos</span>
        </button>
      </div>

      {activeTab === "posts" && (
        <div
          className={`grid  gap-3 px-1 py-3 sm:gap-4 sm:px-2 ${
            isClicked ? " grid grid-rows-1" : "grid-cols-2"
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          {postUsers.map((userName, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square rounded-md overflow-hidden"
            >
              {postImages(userName)}
              {isClicked && (
                <button
                  className="absolute top-2 right-2  text-white rounded-full p-1"
                  onClick={e => {
                    e.stopPropagation()
                    setOpenMenu(prev =>
                      prev && prev.type === "posts" && prev.index === idx
                        ? null
                        : { type: "posts", index: idx }
                    )
                  }}
                  aria-haspopup="menu"
                  aria-expanded={
                    openMenu?.type === "posts" && openMenu.index === idx
                  }
                >
                  <IoEllipsisVertical className="w-4 h-4" />
                </button>
              )}

              {openMenu?.type === "posts" && openMenu.index === idx && (
                <div
                  ref={menuRef}
                  className="absolute top-8 right-2 bg-white border border-gray-200 rounded-md shadow-lg z-10  py-1"
                  role="menu"
                >
                  <MenuItems
                    item={{ id: idx, userName: userName }}
                    onCopyLink={() => "Copy link"}
                    onShare={() => "Share"}
                    onHidePost={() => handleDelete("posts", idx)}
                    onMuteUser={() => "Mute user"}
                    onUnfollowUser={() => "Unfollow user"}
                    onToggleComments={() => "Toggle comments"}
                    onReport={() => "Report"}
                    onClose={() => setOpenMenu(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {activeTab === "videos" && (
        <div
          className={`grid  gap-3 px-1 py-3 sm:gap-4 sm:px-2 ${
            isClicked ? " grid grid-rows-1" : "grid-cols-2"
          }`}
          onClick={() => setIsClicked(!isClicked)}
        >
          {videoUsers.map((userName, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-square rounded-md overflow-hidden"
            >
              {postVideos(userName)}
              {isClicked && (
                <button
                  className="absolute top-2 right-2 bg-black/40 text-white rounded-full p-1"
                  onClick={e => {
                    e.stopPropagation()
                    setOpenMenu(prev =>
                      prev && prev.type === "videos" && prev.index === idx
                        ? null
                        : { type: "videos", index: idx }
                    )
                  }}
                  aria-haspopup="menu"
                  aria-expanded={
                    openMenu?.type === "videos" && openMenu.index === idx
                  }
                >
                  <IoEllipsisVertical className="w-4 h-4" />
                </button>
              )}

              {openMenu?.type === "videos" && openMenu.index === idx && (
                <div
                  ref={menuRef}
                  className="absolute top-8 right-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-40 py-1"
                  role="menu"
                >
                  <button
                    className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleCopyLink("videos", idx)}
                  >
                    <FaCopy className="w-4 h-4" />
                    Copy link
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleShare("videos", idx)}
                  >
                    <FaShare className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    className="w-full px-3 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50"
                    onClick={() => handleDelete("videos", idx)}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Posts
