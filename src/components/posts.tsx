import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import { FaImages, FaVideo } from "react-icons/fa"
import exampleVideo from "../images/videos/example.mp4"

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("posts")

  const videos = React.useMemo(() => [exampleVideo, exampleVideo], [])

  return (
    <div>
      <div className=" grid grid-cols-2 gap-4 items-center justify-center border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2 justify-center">
          <FaImages className="w-4 h-4" />
          <button
            className={`text-sm font-semibold ${
              activeTab === "posts" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <FaVideo className="w-4 h-4" />
          <button
            className={`text-sm font-semibold ${
              activeTab === "videos" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </div>
      </div>
      {activeTab === "posts" && (
        <div className=" grid grid-cols-2 gap-4 px-2 py-2">
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            <StaticImage
              src={"../images/image.png"}
              alt="post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            <StaticImage
              src={"../images/image.png"}
              alt="post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            <StaticImage
              src={"../images/image.png"}
              alt="post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
            <StaticImage
              src={"../images/image.png"}
              alt="post"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      {activeTab === "videos" && (
        <div className=" grid grid-cols-2 gap-4 px-2 py-2">
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
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
          </div>
          <div className="relative w-full aspect-square rounded-md overflow-hidden">
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Posts
