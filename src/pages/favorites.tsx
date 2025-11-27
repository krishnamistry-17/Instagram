import * as React from "react"
import { storiesData } from "../components/storiesData"
import { imageComponents } from "../components/storymedia"
import { MdPlayArrow } from "react-icons/md"
import { useLikes } from "../context/likesContext"
import { currentUsername } from "../context/auth"

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
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Your liked stories</h1>

      {likedItems.length === 0 ? (
        <p className="text-gray-600">No likes yet.</p>
      ) : (
        <div className="space-y-4">
          {likedItems.map(item => {
            if (item.type === "image") {
              const element = imageComponents[item.slideId]
              return (
                <div
                  key={item.key}
                  className="relative rounded overflow-hidden shadow-sm flex items-center"
                >
                  {React.cloneElement(element, {
                    className:
                      "w-15 h-15 object-cover pointer-events-none select-none",
                  })}
                  <div className=" px-2 py-1 mt-auto text-sm font-bold">
                    {`You liked ${item.ownerName}'s story`}
                  </div>
                  <button
                    className="ml-auto text-sm text-blue-600 hover:underline px-2"
                    onClick={() => toggleLike(item.key, currentUsername)}
                  >
                    Unlike
                  </button>
                </div>
              )
            }

            return (
              <div
                key={item.key}
                className="relative h-40 rounded bg-gray-200 flex items-center justify-center shadow-sm"
              >
                <MdPlayArrow className="w-10 h-10 text-gray-700" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-2 py-1">
                  {item.ownerName || item.storyId}
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
