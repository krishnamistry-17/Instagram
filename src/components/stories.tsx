import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { RxCross2 } from "react-icons/rx"
import { MdNavigateNext, MdNavigateBefore, MdDelete } from "react-icons/md"
import { IoAdd, IoDownloadOutline, IoEllipsisVertical } from "react-icons/io5"
import exampleVideo from "../images/videos/example.mp4"
import { MdVolumeOff, MdVolumeUp, MdPause, MdPlayArrow } from "react-icons/md"
import { IoEye } from "react-icons/io5"
import ProfileButton from "./profilebutton"
import { BiSolidShare } from "react-icons/bi"
// import { FaUser } from "react-icons/fa"

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
    ],
    []
  )
  const [isImage, setIsImage] = React.useState<boolean>(false)
  const [isVideo, setIsVideo] = React.useState<boolean>(false)

  const slidesByStory = React.useMemo(
    () => [
      [
        { type: "image", id: "image1" as const },
        { type: "image", id: "image3" as const },
        { type: "image", id: "image4" as const },
        { type: "video", id: "video1" as const },
      ],
      [
        { type: "image", id: "image2" as const },
        { type: "image", id: "image3" as const },
        { type: "video", id: "video1" as const },
        { type: "image", id: "image4" as const },
      ],
      [
        { type: "image", id: "image1" as const },
        { type: "image", id: "image3" as const },
        { type: "video", id: "video1" as const },
        { type: "image", id: "image4" as const },
      ],
      [{ type: "image", id: "image1" as const }],
      [{ type: "image", id: "image2" as const }],
      [{ type: "video", id: "video1" as const }],
      [{ type: "image", id: "image3" as const }],
      [{ type: "image", id: "image4" as const }],
    ],
    [
      { type: "image", id: "image3" as const },
      { type: "video", id: "video1" as const },
      { type: "image", id: "image4" as const },
      { type: "image", id: "image5" as const },
    ]
  )

  const [isOpen, setIsOpen] = React.useState(false)
  const [isCountOpen, setIsCountOpen] = React.useState(false)
  const [currentStory, setCurrentStory] = React.useState(0)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [rotating, setRotating] = React.useState<Record<number, boolean>>({})
  const [angles, setAngles] = React.useState<Record<number, number>>({})
  const [openingIdx, setOpeningIdx] = React.useState<number | null>(null)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const imageTimerRef = React.useRef<number | null>(null)
  const [isMuted, setIsMuted] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)

  //control visibility
  React.useEffect(() => {
    if (!isOpen) return
    const slide = slidesByStory[currentStory][currentSlide]
    if (!slide) return
    setIsImage(slide.type === "image")
    setIsVideo(slide.type === "video")
  }, [isOpen, currentStory, currentSlide, slidesByStory])

  // Ensure video starts on desktop where autoplay can be flaky
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
      // cleanup
      if (imageTimerRef.current) {
        window.clearInterval(imageTimerRef.current)
        imageTimerRef.current = null
      }
      setIsPaused(false)
      setIsMuted(true)
    }
  }, [isOpen])

  const renderAvatar = (name: string) => {
    if (name === "you") {
      return (
        <StaticImage
          src="../images/image5.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "alice") {
      return (
        <StaticImage
          src="../images/image7.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "bob") {
      return (
        <StaticImage
          src="../images/image6.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "carol") {
      return (
        <StaticImage
          src="../images/image8.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "dave") {
      return (
        <StaticImage
          src="../images/image9.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "eve") {
      return (
        <StaticImage
          src="../images/image10.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    if (name === "jack") {
      return (
        <StaticImage
          src="../images/image6.png"
          className="w-full h-full rounded-full object-cover"
          alt={name}
        />
      )
    }
    // if (name === "you") {
    //   return <FaUser className="w-full h-full rounded-full object-cover" />
    // }
  }

  // Manage progress per slide--> that shows the progress fro slides
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
  }, [isOpen, currentStory, currentSlide])

  // Individual circle rotation effect
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
    const slides = slidesByStory[currentStory] //from the current slide get the all story of this slide
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1)
      setProgress(0)
    } else {
      handleNextStory()
    }
  }

  const handleScrollUp = () => {
    console.log("scroll up")
    setIsCountOpen(true)
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

  return (
    <section className="bg-white border border-gray-200 rounded-md md:rounded-xl shadow-sm">
      <div className="px-3 py-3">
        <div className="flex sm:gap-2  overflow-x-auto no-scrollbar transition-all duration-150">
          {users.map((user, idx) => (
            <div
              key={user.id}
              className="w-20 flex flex-col items-center shrink-0"
            >
              <div className="relative mx-auto">
                <div
                  className="w-16 h-16 relative cursor-pointer"
                  onClick={() => handleCircleClick(idx)}
                >
                  {openingIdx !== idx && (
                    <div className="absolute inset-0 rounded-full p-[2px] bg-linear-to-tr from-pink-500 to-yellow-500" />
                  )}
                  {/* Sweep gradient ring overlay with fixed thickness */}
                  {openingIdx === idx && (
                    <div
                      className="story-ring-rotator story-ring-sweep"
                      style={
                        {
                          "--ring": "3px",
                          animationDuration: "1.5s",
                        } as React.CSSProperties
                      }
                      onAnimationEnd={() => handleRingEnd(idx)}
                    />
                  )}
                  <div className="w-full h-full rounded-full bg-white p-[3px] relative z-20">
                    {renderAvatar(user.name)}
                    {user.name === "you" && (
                      <div className=" absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white p-[3px] z-40">
                        <IoAdd className="w-full h-full bg-blue-500 text-white rounded-full" />
                      </div>
                    )}
                  </div>
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

          <div className="flex-1 relative flex items-center justify-center">
            <div className="relative w-[min(92vw,calc(99vh*0.5625))] aspect-9/16 bg-black rounded-xl overflow-hidden centered  shadow-2xl z-20">
              {/* Media */}
              {(() => {
                const slide = slidesByStory[currentStory][currentSlide]

                if (!slide) return null
                if (slide.type === "video") {
                  return (
                    <video
                      ref={videoRef}
                      src={exampleVideo}
                      className="w-full h-full object-cover"
                      key={`${currentStory}-${currentSlide}`}
                      autoPlay
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onTimeUpdate={e => {
                        const v = e.currentTarget
                        if (v.duration && isFinite(v.duration)) {
                          setProgress(
                            Math.min((v.currentTime / v.duration) * 100, 100)
                          )
                        }
                      }}
                      onEnded={handleNextSlide}
                    />
                  )
                }
                // image slide
                if (slide.id === "image1") {
                  return (
                    <StaticImage
                      src="../images/image3.png"
                      className="w-full h-full object-cover"
                      alt="story image"
                    />
                  )
                }
                if (slide.id === "image2") {
                  return (
                    <StaticImage
                      src="../images/image2.png"
                      className="w-full h-full object-cover"
                      alt="story image"
                    />
                  )
                }
                if (slide.id === "image3") {
                  return (
                    <StaticImage
                      src="../images/image3.png"
                      className="w-full h-full object-cover"
                      alt="story image"
                    />
                  )
                }
                if (slide.id === "image4") {
                  return (
                    <StaticImage
                      src="../images/image4.png"
                      className="w-full h-full object-cover"
                      alt="story image"
                    />
                  )
                }
              })()}

              {/* In-card progress bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
                {slidesByStory[currentStory].map((_, i) => (
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
                onClick={goPrev}
                aria-label="Previous"
              />
              <button
                className="sm:hidden absolute inset-y-0 right-0 w-1/2"
                onClick={goNext}
                aria-label="Next"
              />

              <button
                className="absolute top-4 right-4 z-10 bg-white/30 rounded-full p-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="w-7 h-7" />
              </button>

              {/* Controls */}
              {isVideo && (
                <>
                  <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
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
                onClick={() => setIsCountOpen(prev => !prev)}
                onScroll={handleScrollUp}
                aria-label="Viewers"
              >
                <IoEye className="w-4 h-4" />
                <span>5</span>
              </button>
              {isCountOpen && (
                <>
                  <button
                    className="absolute inset-0 z-20 bg-black/30"
                    onClick={() => setIsCountOpen(false)}
                    aria-label="Close viewers"
                  />
                  <div className="absolute bottom-3 left-2 z-30 py-4 bg-white text-gray-900 rounded-lg shadow-xl w-[min(94%,400px)]">
                    <div className="flex items-center justify-between px-3 py-2 shadow-sm bg-white">
                      <div className="flex items-center gap-2">
                        <IoEye className="w-5 h-5" />
                        <span className="text-sm font-medium">5 views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IoDownloadOutline className="w-5 h-5" />
                        <MdDelete className="w-5 h-5" />
                        <button
                          className="p-1 rounded hover:bg-gray-100"
                          onClick={() => setIsCountOpen(false)}
                          aria-label="Close"
                        >
                          <RxCross2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-40 overflow-auto px-3 py-2 no-scrollbar">
                      <p className="text-sm font-semibold py-2">Viewers</p>
                      {users?.map((user: { id: number; name: string }) => (
                        <div className="flex items-center justify-between gap-2 py-1">
                          <div className="flex items-center gap-2">
                            <ProfileButton name={user?.name} />
                            <p className="text-sm">{user?.name}</p>
                          </div>
                          <div className="flex items-center gap-3 text-gray-500">
                            <IoEllipsisVertical className="w-5 h-5" />
                            <BiSolidShare className="w-5 h-5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stories
