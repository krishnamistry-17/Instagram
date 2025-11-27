import * as React from "react"
import { useStory } from "../context/storyContext"

const UploadModal: React.FC = () => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const { addUploadsToUser, multipleMedia } = useStory()
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    addUploadsToUser(0, files)
    if (multipleMedia) {
      for (let i = 0; i < files.length; i++) {
        addUploadsToUser(0, [files[i]])
      }
    }
    e.currentTarget.value = ""
  }
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleUpload}
      />
      <button onClick={() => fileInputRef.current?.click()}>Upload</button>
    </div>
  )
}
export default UploadModal
