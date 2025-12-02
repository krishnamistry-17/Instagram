import * as React from "react"
import { storiesData, StoryDef, SlideDef } from "../components/storiesData"

type StoryContextValue = {
  allStories: StoryDef[]
  setAllStories: (stories: StoryDef[]) => void
  uploads: { [id: string]: string }
  addUploadsToUser: (userIndex: number, files: FileList | File[]) => void
  isStoryUpload: boolean
  setIsStoryUpload: (isUpload: boolean) => void
  multipleMedia: boolean
  isItTakeTime: boolean
  setIsItTakeTime: (isTakeTime: boolean) => void
  uploadModalOpen: boolean
  setUploadModalOpen: (isOpen: boolean) => void
}

const StoryContext = React.createContext<StoryContextValue | null>(null)

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allStories, setAllStories] = React.useState<StoryDef[]>(storiesData)
  const [uploads, setUploads] = React.useState<{ [id: string]: string }>({})
  const [isStoryUpload, setIsStoryUpload] = React.useState(false)
  const [multipleMedia, setMultipleMedia] = React.useState<boolean>(false)
  const [isItTakeTime, setIsItTakeTime] = React.useState(false)
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false)
  const addUploadsToUser = React.useCallback(
    (userIndex: number, files: FileList | File[]) => {
      const fileArray = Array.from(files as FileList)
      if (fileArray.length === 0) return

      const newSlides: SlideDef[] = []
      const newUploads: { [id: string]: string } = {}

      fileArray.forEach((file, i) => {
        const url = URL.createObjectURL(file)
        const isImage = file.type.startsWith("image/")
        const idPrefix = isImage ? "upload_image" : "upload_video"
        const id = `${idPrefix}_${Date.now()}_${i}`
        newUploads[id] = url
        newSlides.push({
          id,
          type: isImage ? ("image" as const) : ("video" as const),
        })
      })

      if (multipleMedia) {
        newSlides.forEach((slide, i) => {
          slide.id = `${slide.id}_${i}`
        })
        setMultipleMedia(true)
      }
      if (isStoryUpload) {
        setIsItTakeTime(true)
        setTimeout(() => {
          setIsItTakeTime(false)
        }, 1000)
      }
      setUploads(prev => ({ ...prev, ...newUploads }))
      setAllStories(prev => {
        const next = [...prev]
        const target = next[userIndex]
        if (!target) return prev
        next[userIndex] = {
          ...target,
          slides: [...target.slides, ...newSlides],
        }
        return next
      })
    },
    [multipleMedia]
  )

  React.useEffect(() => {
    if (isStoryUpload) {
      const saveStoriesData = allStories.filter(s => s.user === "you")
      localStorage.setItem("stories", JSON.stringify(saveStoriesData))
    }
  }, [allStories, isStoryUpload])

  return (
    <StoryContext.Provider
      value={{
        allStories,
        setAllStories,
        uploads,
        addUploadsToUser,
        isStoryUpload,
        setIsStoryUpload,
        multipleMedia,
        isItTakeTime,
        setIsItTakeTime,
        uploadModalOpen,
        setUploadModalOpen,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}

export const useStory = () => {
  const context = React.useContext(StoryContext)
  if (!context) throw new Error("useStory must be used within StoryProvider")
  return context
}
