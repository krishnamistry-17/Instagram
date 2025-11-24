import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { FaImages, FaVideo } from "react-icons/fa"
import exampleVideo from "../images/videos/example.mp4"

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("posts")

  const videos = React.useMemo(
    () => [exampleVideo, exampleVideo, exampleVideo],
    []
  )

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

  return (
    <div>
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
        <div className="grid grid-cols-2 gap-3 px-1 py-3 sm:gap-4 sm:px-2">
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postImages("alice")}
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postImages("bob")}
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postImages("carol")}
          </div>
        </div>
      )}
      {activeTab === "videos" && (
        <div className="grid grid-cols-2 gap-3 px-1 py-3 sm:gap-4 sm:px-2">
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postVideos("alice")}
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postVideos("bob")}
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            {postVideos("carol")}
          </div>
        </div>
      )}
    </div>
  )
}

export default Posts
