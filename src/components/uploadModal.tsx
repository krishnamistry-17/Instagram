import * as React from "react"
import { useStory } from "../context/storyContext"
import { RxCross2 } from "react-icons/rx"
import { IoImageOutline } from "react-icons/io5"
import { MdVideoLibrary } from "react-icons/md"
import { FaCamera } from "react-icons/fa"

const UploadModal: React.FC = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const cameraInputRef = React.useRef<HTMLInputElement | null>(null)
  const { isItTakeTime, setIsItTakeTime } = useStory()
  const { addUploadsToUser, multipleMedia, isStoryUpload, setIsStoryUpload } =
    useStory()

  const [entered, setEntered] = React.useState(false)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    addUploadsToUser(0, files)
    setIsItTakeTime(true)
    if (multipleMedia) {
      for (let i = 0; i < files.length; i++) {
        addUploadsToUser(0, [files[i]])
      }
    }
    setIsItTakeTime(false)
    e.currentTarget.value = ""
    setIsStoryUpload(false)
  }

  React.useEffect(() => {
    if (!isStoryUpload) return

    const id = window.setTimeout(() => setEntered(true), 10)
    const prevent = (e: Event) => {
      if (typeof (e as any).preventDefault === "function")
        (e as any).preventDefault()
    }
    window.addEventListener("wheel", prevent, { passive: false })
    window.addEventListener("touchmove", prevent, { passive: false })
    return () => {
      window.clearTimeout(id)
      window.removeEventListener("wheel", prevent as any)
      window.removeEventListener("touchmove", prevent as any)
      setEntered(false)
    }
  }, [isStoryUpload])

  if (!isStoryUpload) return null

  return (
    <div
      className="fixed inset-0 z-999 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsStoryUpload(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          absolute inset-y-0 left-0 w-full sm:w-[420px]
          bg-white shadow-2xl flex flex-col
          transform transition-transform duration-300 ease-out
          rounded-none sm:rounded-r-xl
        "
        style={{
          transform: entered ? "translateX(0)" : "translateX(-100%)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 border-b bg-white">
          <p className="text-sm font-semibold text-black">Create story</p>
          <button
            className="p-2 rounded text-black"
            onClick={() => setIsStoryUpload(false)}
            aria-label="Close"
          >
            <RxCross2 className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-gray-50 hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            <IoImageOutline className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-black">Upload photos</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-gray-50 hover:bg-gray-100"
            onClick={() => cameraInputRef.current?.click()}
          >
            <FaCamera className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-black">Take photo or video</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-gray-50 hover:bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            <MdVideoLibrary className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-black">Upload videos</span>
          </button>
          <p className="text-xs text-gray-500 px-1">
            Supported: JPG, PNG, MP4. You can select multiple items.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  )
}
export default UploadModal
