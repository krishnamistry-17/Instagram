import * as React from "react"
import { RxCross2 } from "react-icons/rx"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { IoAdd } from "react-icons/io5"
import exampleVideo from "../images/videos/example.mp4"
import video1 from "../images/videos/video1.mp4"
import { MdVolumeOff, MdVolumeUp, MdPause, MdPlayArrow } from "react-icons/md"
import { IoEye } from "react-icons/io5"
import { imageComponents } from "./storymedia"
import { renderAvatar } from "./storiesData"
import { MdFavorite } from "react-icons/md"
import { MdFavoriteBorder } from "react-icons/md"
import { useLikes } from "../context/likesContext"
import { currentUsername } from "../context/auth"
import { makeSlideKey } from "../utils/storyKeys"
import { useStory } from "../context/storyContext"
import StoryDataSync from "./StoryDataSync"

const ViewercountLazy = React.lazy(() =>
  import("./viewercount").then(m => ({ default: m.Viewercount }))
)

const Stories: React.FC = () => {
  const users = React.useMemo(
    () => [
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
    ],
    []
  )
  const {
    allStories,
    uploads,
    addUploadsToUser,
    isStoryUpload,
    multipleMedia,
  } = useStory()

  const { likedSlides, toggleLike } = useLikes()

  const slidesByStory = React.useMemo(
    () => allStories.map(s => s.slides),
    [allStories]
  )

  const [isImage, setIsImage] = React.useState<boolean>(false)
  const [isVideo, setIsVideo] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isCountOpen, setIsCountOpen] = React.useState(false)
  const [currentStory, setCurrentStory] = React.useState(0)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [rotating, setRotating] = React.useState<Record<number, boolean>>({})
  const [angles, setAngles] = React.useState<Record<number, number>>({})

  const [openingIdx, setOpeningIdx] = React.useState<number | null>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const imageRef = React.useRef<HTMLImageElement | null>(null)
  const imageTimerRef = React.useRef<number | null>(null)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isHolding, setIsHolding] = React.useState<boolean>(false)
  const holdTimeoutRef = React.useRef<number | null>(null)
  const swipeStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [panelHeight, setPanelHeight] = React.useState(230)
  const justOpenedViewersAtRef = React.useRef<number>(0)

  const MIN_HEIGHT = 230
  const [dragStartY, setDragStartY] = React.useState<number | null>(null)
  const [startHeight, setStartHeight] = React.useState<number>(MIN_HEIGHT)

  const currentSlideKey = React.useMemo(() => {
    const story = allStories[currentStory]
    const slide = slidesByStory[currentStory]?.[currentSlide]
    if (!story || !slide) return null
    return makeSlideKey(story.id, slide.id)
  }, [currentStory, currentSlide, slidesByStory])

  React.useEffect(() => {
    if (!isOpen) return
    const slide = slidesByStory[currentStory][currentSlide]
    if (!slide) return
    setIsImage(slide.type === "image")
    setIsVideo(slide.type === "video")
  }, [isOpen, currentStory, currentSlide, slidesByStory])

  React.useEffect(() => {
    const slide = slidesByStory[currentStory][currentSlide]

    if (!isOpen || !slide || slide.type !== "video") return
    const v = videoRef.current
    if (!v) return
    v.muted = isMuted
    const tryPlay = async () => {
      try {
        await v.play()
        setIsPaused(false)
      } catch {
        setIsPaused(true)
      }
    }
    tryPlay()
    const onCanPlay = () => tryPlay()
    v.addEventListener("canplay", onCanPlay, { once: true })
    return () => {
      v.removeEventListener("canplay", onCanPlay)
    }
  }, [isOpen, currentStory, currentSlide, isMuted])

  const handleCircleClick = (idx: number) => {
    if (openingIdx !== null || isOpen) return
    if (idx === 0 && (slidesByStory[idx]?.length ?? 0) === 0) {
      fileInputRef.current?.click()
      return
    }
    setOpeningIdx(idx)
  }

  const handleRingEnd = (idx: number) => {
    if (openingIdx === idx) {
      setCurrentStory(idx)
      setCurrentSlide(0)
      setIsOpen(true)
      setOpeningIdx(null)
    }
  }

  const imageSlideDurationSec = 5

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    if (!isOpen) {
      setRotating({})
      setCurrentSlide(0)
      setProgress(0)
      if (imageTimerRef.current) {
        window.clearInterval(imageTimerRef.current)
        imageTimerRef.current = null
      }
      setIsPaused(false)
      setIsMuted(true)
      return
    }

    const preventDefault = (e: Event) => {
      if (typeof (e as any).preventDefault === "function") {
        ;(e as any).preventDefault()
      }
    }
    const preventKeyScroll = (e: KeyboardEvent) => {
      const blocked =
        e.key === " " ||
        e.key === "Spacebar" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
      if (blocked) {
        e.preventDefault()
      }
    }
    window.addEventListener("wheel", preventDefault, { passive: false })
    window.addEventListener("touchmove", preventDefault, { passive: false })
    window.addEventListener("keydown", preventKeyScroll, { passive: false })
    return () => {
      window.removeEventListener("wheel", preventDefault as any)
      window.removeEventListener("touchmove", preventDefault as any)
      window.removeEventListener("keydown", preventKeyScroll as any)
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    if (imageTimerRef.current) {
      window.clearInterval(imageTimerRef.current)
      imageTimerRef.current = null
    }
    setProgress(0)
    const slides = slidesByStory[currentStory]
    const active = slides[currentSlide]
    if (!active) return
    if (active.type === "image") {
      if (isHolding || isCountOpen) return
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

  React.useEffect(() => {
    const activeUserIds = Object.keys(rotating).filter(
      id => rotating[parseInt(id)]
    )
    if (!activeUserIds.length) return

    const interval = setInterval(() => {
      setAngles(prevAngles => {
        const newAngles = { ...prevAngles }
        activeUserIds.forEach(id => {
          newAngles[parseInt(id)] = (newAngles[parseInt(id)] || 0) + 5
        })
        return newAngles
      })
    }, 50)

    return () => clearInterval(interval)
  }, [rotating])

  const handleNextStory = () => {
    if (currentStory === slidesByStory.length - 1) {
      setIsOpen(false)
      return
    }
    setCurrentStory(prev => prev + 1)
    setCurrentSlide(0)
    setProgress(0)
  }

  const handlePreviousStory = () => {
    if (currentStory === 0) return
    setCurrentStory(prev => prev - 1)
    setCurrentSlide(0)
    setProgress(0)
  }

  const handleNextSlide = () => {
    const slides = slidesByStory[currentStory]
    if (!slides) return
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
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
    const slides = slidesByStory[currentStory]
    if (!slides) return
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1)
      setProgress(0)
    } else {
      handleNextStory()
    }
  }

  const lastNavAtRef = React.useRef<number>(0)
  const safeGoPrev = () => {
    const now = Date.now()
    if (now - lastNavAtRef.current < 280) return
    lastNavAtRef.current = now
    goPrev()
  }
  const safeGoNext = () => {
    const now = Date.now()
    if (now - lastNavAtRef.current < 280) return
    lastNavAtRef.current = now
    goNext()
  }

  const toggleMute = () => {
    setIsMuted(m => {
      const next = !m
      if (videoRef.current) {
        videoRef.current.muted = next
      }
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

  const lastTapTimeRef = React.useRef<number>(0)
  const tapZoneTimerRef = React.useRef<number | null>(null)
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
          safeGoPrev()
        } else {
          safeGoNext()
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

    if (isVideo && isMuted) {
      e.preventDefault()
      e.stopPropagation()
      setIsMuted(false)
      if (videoRef.current) {
        try {
          videoRef.current.muted = false
          videoRef.current.play().catch(() => {})
        } catch {}
      }
      lastTapTimeRef.current = 0
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

  const startHold = () => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    holdTimeoutRef.current = window.setTimeout(() => {
      setIsHolding(true)
      if (isVideo && videoRef.current) {
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
      if (isVideo && videoRef.current) {
        try {
          videoRef.current.play()
        } catch {}
      } else if (isImage && imageRef.current) {
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

  return (
    <section className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm">
      <StoryDataSync />
      <div className="px-3 py-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={e => {
            const files = e.target.files
            if (!files || files.length === 0) return
            addUploadsToUser(0, files)
            if (multipleMedia) {
              for (let i = 0; i < files.length; i++) {
                addUploadsToUser(0, [files[i]])
              }
            }
            if (fileInputRef.current) fileInputRef.current.value = ""
          }}
        />
        <div className=" grid grid-flow-col-dense gap-0 overflow-x-auto no-scrollbar transition-all duration-150">
          {users.map((user, idx) => (
            <div
              key={user.id}
              className="w-18 flex flex-col items-center shrink-0"
            >
              <div className="relative mx-auto">
                <div
                  className="w-16 h-16 relative cursor-pointer"
                  onClick={() => handleCircleClick(idx)}
                >
                  {openingIdx !== idx && (
                    <div className="absolute inset-0 rounded-full p-[2px] bg-linear-to-tr from-pink-500 to-yellow-500" />
                  )}
                  {openingIdx === idx && (
                    <div
                      className="story-ring-rotator story-ring-sweep"
                      style={
                        {
                          "--ring": "3px",
                          animationDuration: "0.2s",
                        } as React.CSSProperties
                      }
                      onAnimationEnd={() => handleRingEnd(idx)}
                    />
                  )}
                  <div className="w-full h-full rounded-full bg-white p-[3px] relative z-20">
                    {renderAvatar(user.name)}
                  </div>
                  {idx === 0 &&
                    (slidesByStory[idx]?.length ?? 0) === 0 &&
                    !isStoryUpload &&
                    idx === 0 && (
                      <div className=" absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white p-[3px] z-40">
                        <IoAdd className="w-full h-full bg-blue-500 text-white rounded-full" />
                      </div>
                    )}
                </div>
              </div>
              <p className="mt-2 text-center text-sm truncate">{user.name}</p>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-999 bg-black/40 flex flex-col">
          <div className="relative z-10 flex gap-1 px-3">
            {slidesByStory[currentStory].map((_, i) => (
              <div key={i} className="flex-1 h-[2px] rounded">
                <div
                  className="h-full bg-white rounded transition-[width] duration-100 hidden"
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

          <div
            className="
            relative 
            w-full 
            h-screen 
            flex 
            sm:items-center 
            sm:justify-center"
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
              style={{ touchAction: "none" }}
              onTouchStart={handleViewerTouchStart}
              onTouchMove={handleViewerTouchMove}
              onTouchEnd={handleViewerTouchEnd}
            >
              {(() => {
                const slides = slidesByStory[currentStory] || []
                const slide = slides[currentSlide]
                const story = allStories[currentStory]
                if (!slide) return null
                if (slide.type === "video") {
                  return (
                    <video
                      ref={videoRef}
                      src={uploads?.[slide.id] || undefined || video1}
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
                      onDoubleClick={togglePlay}
                      onPause={() => setIsPaused(true)}
                      onPlay={() => setIsPaused(false)}
                    />
                  )
                }

                // image slide
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

              {/* In-card progress bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 ">
                {(slidesByStory[currentStory] || []).map((_, i) => (
                  <div key={i} className="flex-1 h-[2px] rounded">
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

              {/* Top/bottom gradient overlays */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent" />

              {/* Tap zones (mobile) */}
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

              <button
                className="absolute top-4 right-4 z-10 bg-white/30 rounded-full p-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="w-7 h-7" />
              </button>

              {isVideo && (
                <>
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
                </>
              )}

              {/* Desktop arrows */}
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

              {/* Viewer count pill (centered) */}
              <button
                className="absolute bottom-3 left-3 z-10 bg-white/30 text-white text-xs p-2 rounded-full backdrop-blur-sm flex items-center gap-1"
                onClick={() => {
                  setIsCountOpen(prev => !prev)
                }}
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
                <React.Suspense fallback={null}>
                  <ViewercountLazy
                    panelHeight={panelHeight}
                    setPanelHeight={setPanelHeight}
                    dragStartY={dragStartY}
                    setDragStartY={setDragStartY}
                    startHeight={startHeight}
                    setStartHeight={setStartHeight}
                    setIsCountOpen={setIsCountOpen}
                    users={users}
                    currentStory={currentStory}
                    currentSlide={currentSlide}
                    ownerName={users[currentStory]?.name}
                  />
                </React.Suspense>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stories
