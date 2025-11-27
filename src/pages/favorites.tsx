import * as React from "react"
import { storiesData } from "../components/storiesData"
import { imageComponents, videoComponents } from "../components/storymedia"
import { MdFavorite, MdFavoriteBorder, MdPlayArrow } from "react-icons/md"
import { useLikes } from "../context/likesContext"
import { currentUsername } from "../context/auth"
import { navigate } from "gatsby"
import { FaAngleLeft } from "react-icons/fa"

const users = [
  { id: 1, name: "you" },
  { id: 2, name: "alice" },
  { id: 3, name: "bob" },
  { id: 4, name: "carol" },
  { id: 5, name: "dave" },
  { id: 6, name: "eve" },
  { id: 7, name: "jack" },
  { id: 8, name: "lily" },
  { id: 9, name: "lucy" },
  { id: 10, name: "mary" },
  { id: 11, name: "nina" },
  { id: 12, name: "olive" },
]

const FavoritesPage: React.FC = () => {
  const { likedSlides, toggleLike } = useLikes()

  const likedItems = React.useMemo(() => {
    const items: Array<{
      key: string
      storyId: string
      slideId: string
      ownerName: string | undefined
      type: "image" | "video" | undefined
    }> = []
    for (const [key, usersWhoLiked] of Object.entries(likedSlides)) {
      if (!usersWhoLiked?.includes(currentUsername)) continue
      const [storyId, slideId] = key.split(":")
      const storyIdx = storiesData.findIndex(s => s.id === storyId)
      const ownerName = users[storyIdx]?.name
      const slideDef = storiesData[storyIdx]?.slides.find(s => s.id === slideId)
      items.push({
        key,
        storyId,
        slideId,
        ownerName,
        type: slideDef?.type,
      })
    }
    return items
  }, [likedSlides])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate("/")}>
          <FaAngleLeft className="w-4 h-4" />
        </button>
        <h1 className="text-xl font-semibold my-4">Your liked stories</h1>
      </div>

      {likedItems.length === 0 ? (
        <p className="text-gray-600">No likes yet.</p>
      ) : (
        <div className="space-y-4">
          {likedItems.map(item => {
            if (item.type === "image") {
              const element = imageComponents[item.slideId]
              const videoElement = videoComponents[item.slideId]

              return (
                <div
                  key={item.key}
                  className="relative rounded overflow-hidden shadow-sm flex items-center justify-between px-2"
                >
                  {React.cloneElement(element, {
                    className:
                      "w-15 h-15 object-cover pointer-events-none select-none",
                  })}
                  <div className=" px-2 py-1 mt-auto text-sm font-bold">
                    {`You liked ${item.ownerName}'s story`}
                  </div>
                  <div
                    className=" ml-auto cursor-pointer"
                    onClick={() => toggleLike(item.key, currentUsername)}
                  >
                    {likedSlides[item.key]?.includes(currentUsername) ? (
                      <MdFavorite className="w-5 h-5 text-red-500" />
                    ) : (
                      <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
                    )}
                  </div>
                </div>
              )
            }

            return (
              <div
                key={item.key}
                className="relative rounded overflow-hidden shadow-sm flex items-center justify-between px-2"
              >
                <div className="flex items-center ">
                  <div className="relative h-15 w-15 rounded bg-gray-200 flex items-center justify-center shadow-sm">
                    <MdPlayArrow className="w-5 h-5 text-gray-700" />
                    {React.cloneElement(videoComponents[item.slideId], {
                      className:
                        "w-15 h-15 object-cover pointer-events-none select-none",
                    })}
                  </div>
                  <div className=" px-2 py-1 mt-auto text-sm font-bold">
                    {`You liked ${item.ownerName}'s story`}
                  </div>
                </div>
                <div
                  className=" ml-auto cursor-pointer"
                  onClick={() => toggleLike(item.key, currentUsername)}
                >
                  {likedSlides[item.key]?.includes(currentUsername) ? (
                    <MdFavorite className="w-5 h-5 text-red-500" />
                  ) : (
                    <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
