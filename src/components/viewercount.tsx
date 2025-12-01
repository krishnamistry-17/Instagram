import * as React from "react"
import ProfileButton from "./profilebutton"
import { BiSolidShare } from "react-icons/bi"
import { IoEye } from "react-icons/io5"
import { IoDownloadOutline } from "react-icons/io5"
import { MdDelete, MdOutlineFileUpload } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"
import { IoEllipsisVertical } from "react-icons/io5"
import { MdFavorite } from "react-icons/md"
import { storiesData } from "./storiesData"
import { useLikes } from "../context/likesContext"
import { currentUsername } from "../context/auth"
import { makeSlideKey } from "../utils/storyKeys"
import { useStory } from "../context/storyContext"
import { uploadStory } from "../lib/uploadMedia"

export const Viewercount: React.FC<{
  panelHeight: number
  setPanelHeight: (height: number) => void
  setIsCountOpen: (isOpen: boolean) => void
  dragStartY: number | null
  setDragStartY: (y: number | null) => void
  startHeight: number
  setStartHeight: (height: number) => void
  users: { id: number; name: string }[]
  currentStory: number
  currentSlide: number
  ownerName: string
  startHold: () => void
  endHold: () => void
}> = ({
  panelHeight,
  setPanelHeight,
  dragStartY,
  setDragStartY,
  startHeight,
  setStartHeight,
  setIsCountOpen,
  users,
  currentStory,
  currentSlide,
  ownerName,
  startHold,
  endHold,
}) => {
  const MIN_HEIGHT = 230
  const MAX_HEIGHT = 400
  const { likedSlides } = useLikes()
  const {
    allStories,
    setAllStories,
    setUploadModalOpen,
    addUploadsToUser,
    multipleMedia,
    isItTakeTime,
    setIsItTakeTime,
  } = useStory()
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    if (typeof e.preventDefault === "function") e.preventDefault()
    const clientY =
      "touches" in e
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY
    setDragStartY(clientY)
    setStartHeight(panelHeight)
    startHold()
  }

  const removeStory = (storyIndex: number) => {
    const updatedStory = allStories?.filter((_, index) => index !== storyIndex)
    const slides = updatedStory[storyIndex]?.slides
    setAllStories(updatedStory)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()

    if (typeof e.preventDefault === "function") e.preventDefault()
    if (dragStartY === null) return

    const clientY =
      "touches" in e
        ? (e as React.TouchEvent).touches[0].clientY
        : (e as React.MouseEvent).clientY
    const delta = dragStartY - clientY

    let newHeight = startHeight + delta

    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT
    if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT

    setPanelHeight(newHeight)
  }

  const handleDragEnd = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation()
      if (typeof e.preventDefault === "function") e.preventDefault()
    }
    if (panelHeight > MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * 0.4) {
      setPanelHeight(MAX_HEIGHT)
    } else {
      setPanelHeight(MIN_HEIGHT)
    }

    setDragStartY(null)
    endHold()
  }

  const currentKey = React.useMemo(() => {
    const story = storiesData[currentStory]
    const slide = story?.slides[currentSlide]
    if (!story || !slide) return null
    return makeSlideKey(story.id, slide.id)
  }, [currentStory, currentSlide])

  const likedCountForStory = React.useMemo(() => {
    const story = storiesData[currentStory]
    if (!story) return 0

    let count = 0
    for (const slide of story.slides) {
      const key = makeSlideKey(story.id, slide.id)
      if (likedSlides[key]?.length > 0) count++
    }
    return count
  }, [currentStory, likedSlides])

  return (
    <>
      <button
        className="absolute inset-0 z-20 bg-black/30"
        onClick={() => setIsCountOpen(false)}
        aria-label="Close viewers"
      />

      <div
        className="absolute bottom-0 left-2 z-30 bg-white text-gray-900 rounded-xl shadow-xl w-[min(94%,400px)]"
        style={{
          height: `${panelHeight}px`,
          transition: dragStartY ? "none" : "height 0.25s ease",
        }}
      >
        <div
          className="w-full flex justify-center py-2 cursor-grab"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ touchAction: "none" }}
        >
          <div className="w-10 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex items-center justify-between px-3 py-2 shadow-sm bg-white">
          <div className="flex items-center gap-2">
            <IoEye className="w-5 h-5" />
            <span className="text-sm font-medium">10 views</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineFileUpload
              className="w-5 h-5"
              onClick={() => {
                try {
                  startHold()
                } catch {}
                fileInputRef.current?.click()
                setIsCountOpen(false)
              }}
              aria-label="Upload"
            />
            <IoDownloadOutline className="w-5 h-5" />
            <MdDelete
              className="w-5 h-5"
              onClick={() => removeStory(currentStory)}
            />
            <button
              className="p-1 rounded hover:bg-gray-100"
              onClick={() => setIsCountOpen(false)}
              aria-label="Close"
            >
              <RxCross2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-auto px-3 pb-4 pt-2 h-[calc(100%-60px)]">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="hidden"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files
              if (!files || files.length === 0) return
              setIsItTakeTime(true)
              startHold()
              for (let i = 0; i < files.length; i++) {
                await uploadStory(files[i])
              }
              addUploadsToUser(0, files)
              if (multipleMedia) {
                for (let i = 0; i < files.length; i++) {
                  addUploadsToUser(0, [files[i]])
                }
              }
              e.currentTarget.value = ""
              setIsItTakeTime(false)
              endHold()
            }}
          />
          <p className="text-sm font-semibold py-2">Viewers</p>
          {users?.map((user: { id: number; name: string }) => (
            <div
              key={user?.id}
              className="flex items-center justify-between gap-2 py-1 relative"
            >
              <div className="flex items-center gap-2">
                <ProfileButton name={user?.name} />
                <p className="text-sm">{user?.name}</p>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <IoEllipsisVertical className="w-5 h-5" />
                <BiSolidShare className="w-5 h-5" />
              </div>
              {(() => {
                const story = storiesData[currentStory]
                const slide = story.slides[currentSlide]
                const key = makeSlideKey(story.id, slide?.id || "")
                const likedUsers = likedSlides[key] || []
                if (
                  user.name === ownerName &&
                  likedUsers.includes(currentUsername)
                ) {
                  return (
                    <MdFavorite className="w-4 h-4 text-red-500 absolute top-7 left-6" />
                  )
                }

                return null
              })()}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
