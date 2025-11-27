import * as React from "react"
import { IoEye } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { MdVolumeOff, MdVolumeUp, MdPause, MdPlayArrow } from "react-icons/md"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import exampleVideo from "../images/videos/example.mp4"
import { imageComponents } from "./storymedia"
import { Viewercount } from "./viewercount"
import { useLikes } from "../context/likesContext"
import { currentUsername } from "../context/auth"
import { makeSlideKey } from "../utils/storyKeys"
import { useStory } from "../context/storyContext"

type Props = {
  isOpen: boolean
  onClose: () => void
  storyIndex: number
  slideIndex?: number
}

const StoryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  storyIndex,
  slideIndex = 0,
}) => {
  const { allStories, uploads } = useStory()
  const { likedSlides, toggleLike } = useLikes()

  const slidesByStory = React.useMemo(
    () => allStories.map(s => s.slides),
    [allStories]
  )

  const [currentStory, setCurrentStory] = React.useState(storyIndex)
  const [currentSlide, setCurrentSlide] = React.useState(slideIndex)
  const [progress, setProgress] = React.useState(0)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isCountOpen, setIsCountOpen] = React.useState(false)
  const [panelHeight, setPanelHeight] = React.useState(230)
  const [dragStartY, setDragStartY] = React.useState<number | null>(null)
  const [startHeight, setStartHeight] = React.useState<number>(230)
  const [isHolding, setIsHolding] = React.useState(false)
  const [isVideo, setIsVideo] = React.useState(false)
  const [isImage, setIsImage] = React.useState(false)
  const imageTimerRef = React.useRef<number | null>(null)
  const swipeStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const lastTapTimeRef = React.useRef<number>(0)
  const tapZoneTimerRef = React.useRef<number | null>(null)
  const holdTimeoutRef = React.useRef<number | null>(null)

  const justOpenedViewersAtRef = React.useRef<number>(0)

  React.useEffect(() => {
    setCurrentStory(storyIndex)
    setCurrentSlide(slideIndex)
  }, [storyIndex, slideIndex])

  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const imageRef = React.useRef<HTMLImageElement | null>(null)

  const currentSlideKey = React.useMemo(() => {
    const story = allStories[currentStory]
    const slide = slidesByStory[currentStory]?.[currentSlide]
    if (!story || !slide) return null
    return makeSlideKey(story.id, slide.id)
  }, [currentStory, currentSlide, slidesByStory, allStories])

  
  React.useEffect(() => {
    const slides = slidesByStory[currentStory] || []
    const slide = slides[currentSlide]
    setIsVideo(!!slide && slide.type === "video")
    setIsImage(!!slide && slide.type === "image")
  }, [currentStory, currentSlide, slidesByStory])

  
  React.useEffect(() => {
    if (!isOpen) return
    if (imageTimerRef.current) {
      window.clearInterval(imageTimerRef.current)
      imageTimerRef.current = null
    }
    setProgress(0)
    const slides = slidesByStory[currentStory] || []
    const active = slides[currentSlide]
    if (!active) return
    if (active.type === "image") {
      if (isHolding || isCountOpen) return
      const imageSlideDurationSec = 5
      imageTimerRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNextSlide()
            return 0
          }
          return prev + 100 / (imageSlideDurationSec * 10)
        })
      }, 100)
      return () => {
        if (imageTimerRef.current) {
          window.clearInterval(imageTimerRef.current)
          imageTimerRef.current = null
        }
      }
    }
  }, [isOpen, currentStory, currentSlide, isHolding, isCountOpen])

  React.useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (isCountOpen) {
      try {
        v.pause()
        setIsPaused(true)
      } catch {}
    } else if (isOpen && isVideo) {
      try {
        v.play()
        setIsPaused(false)
      } catch {}
    }
  }, [isCountOpen, isOpen, isVideo])
  const handleNextStory = () => {
    if (currentStory >= slidesByStory.length - 1) {
      onClose()
      return
    }
    setCurrentStory(s => s + 1)
    setCurrentSlide(0)
    setProgress(0)
  }
  const handlePreviousStory = () => {
    if (currentStory === 0) return
    setCurrentStory(s => s - 1)
    setCurrentSlide(0)
    setProgress(0)
  }
  const handleNextSlide = () => {
    const slides = slidesByStory[currentStory] || []
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1)
      setProgress(0)
      return
    }
    handleNextStory()
  }
  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => Math.max(0, s - 1))
      setProgress(0)
    } else {
      handlePreviousStory()
    }
  }
  const goNext = () => {
    const slides = slidesByStory[currentStory] || []
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1)
      setProgress(0)
    } else {
      handleNextStory()
    }
  }

  const toggleMute = () => {
    setIsMuted(m => {
      const next = !m
      if (videoRef.current) videoRef.current.muted = next
      return next
    })
  }
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPaused(false)
    } else {
      v.pause()
      setIsPaused(true)
    }
  }

  const startHold = () => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    holdTimeoutRef.current = window.setTimeout(() => {
      setIsHolding(true)
      if (videoRef.current) {
        try {
          videoRef.current.pause()
        } catch {}
      }
    }, 250)
  }
  const endHold = () => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    if (isHolding) {
      setIsHolding(false)
      if (videoRef.current) {
        try {
          videoRef.current.play()
        } catch {}
      } else if (imageRef.current) {
        imageRef.current.src = imageRef.current.src
      }
    }
  }

  const handleViewerTouchStart = (e: React.TouchEvent) => {
    const t = e.touches && e.touches[0]
    if (!t) return
    swipeStartRef.current = { x: t.clientX, y: t.clientY }
  }
  const handleViewerTouchMove = (e: React.TouchEvent) => {
    if (!swipeStartRef.current || isCountOpen) return
    const t = e.touches && e.touches[0]
    if (!t) return
    const dx = t.clientX - swipeStartRef.current.x
    const dy = t.clientY - swipeStartRef.current.y
    if (dy < -60 && Math.abs(dx) < 80) {
      
      setIsCountOpen(true)
      justOpenedViewersAtRef.current = Date.now()
      e.preventDefault()
      e.stopPropagation()
      swipeStartRef.current = null
    }
  }
  const handleViewerTouchEnd = () => {
    swipeStartRef.current = null
  }

  const handleTapZoneTouchEnd =
    (side: "left" | "right") => (e: React.TouchEvent) => {
      if (Date.now() - justOpenedViewersAtRef.current < 300) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      if (tapZoneTimerRef.current !== null) {
        window.clearTimeout(tapZoneTimerRef.current)
        tapZoneTimerRef.current = null
        e.preventDefault()
        e.stopPropagation()
        togglePlay()
        return
      }
      tapZoneTimerRef.current = window.setTimeout(() => {
        if (side === "left") {
          goPrev()
        } else {
          goNext()
        }
        tapZoneTimerRef.current = null
      }, 280)
    }

  const handleMediaTouchEnd = (e: React.TouchEvent) => {
    if (Date.now() - justOpenedViewersAtRef.current < 300) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    if (isHolding) {
      endHold()
      return
    }
    const now = Date.now()
    if (now - lastTapTimeRef.current < 300) {
      e.preventDefault()
      e.stopPropagation()
      togglePlay()
      lastTapTimeRef.current = 0
      return
    }
    lastTapTimeRef.current = now
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-999 bg-black/40 flex flex-col">
      <div
        className="
            relative 
            w-full 
            h-screen 
            flex 
            sm:items-center 
            sm:justify-center"
        style={{ touchAction: "none" }}
        onTouchStart={handleViewerTouchStart}
        onTouchMove={handleViewerTouchMove}
        onTouchEnd={handleViewerTouchEnd}
      >
        <div
          className="
              relative 
            bg-black
              overflow-hidden
              shadow-2xl
              z-20
              sm:rounded-xl
              w-full               
              h-full               
              sm:w-[min(93vw,calc(99vh*0.5625))]
              sm:aspect-9/16"
        >
          {(() => {
            const slides = slidesByStory[currentStory] || []
            const slide = slides[currentSlide]
            if (!slide) return null
            if (slide.type === "video") {
              return (
                <video
                  ref={videoRef}
                  src={uploads?.[slide.id] || exampleVideo}
                  className="w-full h-full object-cover"
                  key={`${currentStory}-${currentSlide}`}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  onTouchStart={startHold}
                  onTouchEnd={handleMediaTouchEnd}
                  onTimeUpdate={e => {
                    const v = e.currentTarget
                    if (v.duration && isFinite(v.duration)) {
                      setProgress(
                        Math.min((v.currentTime / v.duration) * 100, 100)
                      )
                    }
                  }}
                  onEnded={handleNextSlide}
                  onDoubleClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    togglePlay()
                  }}
                  onPause={() => setIsPaused(true)}
                  onPlay={() => setIsPaused(false)}
                />
              )
            }
            if (slide.type === "image") {
              const comp = imageComponents[slide.id]
              if (comp) {
                return React.cloneElement(comp, {
                  onTouchStart: startHold,
                  onTouchEnd: endHold,
                })
              }
              const src = uploads?.[slide.id]
              return (
                <img
                  src={src}
                  alt={slide.id}
                  className="w-full h-full object-cover"
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                />
              )
            }
          })()}

          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 ">
            {(slidesByStory[currentStory] || []).map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded">
                <div
                  className="h-full bg-white rounded transition-[width] duration-100"
                  style={{
                    width:
                      i < currentSlide
                        ? "100%"
                        : i === currentSlide
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="absolute top-4 right-4 z-10 bg-white/30 rounded-full p-2 text-white"
            onClick={onClose}
          >
            <RxCross2 className="w-7 h-7" />
          </button>

          <button
            className="sm:hidden absolute inset-y-0 left-0 w-1/2"
            onTouchStart={startHold}
            onDoubleClick={e => {
              e.preventDefault()
              e.stopPropagation()
              togglePlay()
            }}
            onTouchEnd={e => {
              const wasHolding = isHolding
              endHold()
              if (wasHolding) {
                e.preventDefault()
                e.stopPropagation()
                return
              }
              handleTapZoneTouchEnd("left")(e)
            }}
            aria-label="Previous"
          />
          <button
            className="sm:hidden absolute inset-y-0 right-0 w-1/2"
            onTouchStart={startHold}
            onDoubleClick={e => {
              e.preventDefault()
              e.stopPropagation()
              togglePlay()
            }}
            onTouchEnd={e => {
              const wasHolding = isHolding
              endHold()
              if (wasHolding) {
                e.preventDefault()
                e.stopPropagation()
                return
              }
              handleTapZoneTouchEnd("right")(e)
            }}
            aria-label="Next"
          />

          {isVideo && (
            <div className="absolute bottom-15 right-3 z-10 flex flex-col items-center gap-2">
              <button
                className="bg-white/30 text-white rounded-full p-2"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <MdVolumeOff className="w-6 h-6" />
                ) : (
                  <MdVolumeUp className="w-6 h-6" />
                )}
              </button>
              <button
                className="bg-white/30 text-white rounded-full p-2"
                onClick={togglePlay}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <MdPlayArrow className="w-6 h-6" />
                ) : (
                  <MdPause className="w-6 h-6" />
                )}
              </button>
            </div>
          )}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 sm:block hidden"
            onClick={goPrev}
          >
            <MdNavigateBefore className="w-7 h-7" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 sm:block hidden"
            onClick={goNext}
          >
            <MdNavigateNext className="w-7 h-7" />
          </button>

          <button
            className="absolute bottom-3 left-3 z-10 bg-white/30 text-white text-xs p-2 rounded-full backdrop-blur-sm flex items-center gap-1"
            onClick={() => setIsCountOpen(prev => !prev)}
            aria-label="Viewers"
          >
            <IoEye className="w-4 h-4" />
            <span>10</span>
          </button>

          {currentSlideKey && (
            <button
              onClick={() => {
                toggleLike(currentSlideKey, currentUsername)
              }}
              aria-pressed={likedSlides[currentSlideKey]?.includes(
                currentUsername
              )}
              className="absolute bottom-3 right-3 z-10 bg-white/30 text-white text-xs p-2 rounded-full backdrop-blur-sm flex items-center gap-1"
            >
              {likedSlides[currentSlideKey]?.includes(currentUsername) ? (
                <MdFavorite className="w-5 h-5 text-red-500" />
              ) : (
                <MdFavoriteBorder className="w-5 h-5 text-gray-700" />
              )}
            </button>
          )}

          {isCountOpen && (
            <Viewercount
              panelHeight={panelHeight}
              setPanelHeight={setPanelHeight}
              dragStartY={dragStartY}
              setDragStartY={setDragStartY}
              startHeight={startHeight}
              setStartHeight={setStartHeight}
              setIsCountOpen={setIsCountOpen}
              users={allStories.map((s, i) => ({ id: i + 1, name: s.user }))}
              currentStory={currentStory}
              currentSlide={currentSlide}
              ownerName={allStories[currentStory]?.user || "you"}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StoryModal
