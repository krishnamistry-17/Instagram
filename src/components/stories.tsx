import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { RxCross2 } from "react-icons/rx"
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md"
import { IoAdd } from "react-icons/io5"

const Stories: React.FC = () => {
  const users = React.useMemo(
    () => [
      { id: 1, name: "you" },
      { id: 2, name: "alice" },
      { id: 3, name: "bob" },
      { id: 4, name: "carol" },
      { id: 5, name: "dave" },
      { id: 6, name: "eve" },
    ],
    []
  )

  const storyImages = React.useMemo(() => [0, 1, 2, 3, 4, 5], [])

  const [isOpen, setIsOpen] = React.useState(false)
  const [currentStory, setCurrentStory] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [rotating, setRotating] = React.useState<Record<number, boolean>>({})

  const [angles, setAngles] = React.useState<Record<number, number>>({})
  const [openingIdx, setOpeningIdx] = React.useState<number | null>(null)

  const handleCircleClick = (idx: number) => {
    if (openingIdx !== null || isOpen) return
    setOpeningIdx(idx)
  }
  const handleRingEnd = (idx: number) => {
    if (openingIdx === idx) {
      setCurrentStory(idx)
      setIsOpen(true)
      setOpeningIdx(null)
    }
  }

  const duration = 10

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    if (!isOpen) {
      setRotating({})
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNextStory()
          return 0
        }
        return prev + 100 / (duration * 10)
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isOpen, currentStory])

  // Individual circle rotation effect
  React.useEffect(() => {
    const activeUserIds = Object.keys(rotating).filter(
      id => rotating[parseInt(id)]
    )
    if (!activeUserIds.length) return

    const radius = 50
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
    if (currentStory === storyImages.length - 1) {
      setIsOpen(false)
      return
    }
    setCurrentStory(prev => prev + 1)
  }

  const handlePreviousStory = () => {
    if (currentStory === 0) return
    setCurrentStory(prev => prev - 1)
  }

  return (
    <section className="bg-white border border-gray-200 ">
      <div className="px-3 py-3">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
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
                  {/* Static gradient ring background (match suggestions width p-[2px]) */}
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
                          animationDuration: "3s",
                        } as React.CSSProperties
                      }
                      onAnimationEnd={() => handleRingEnd(idx)}
                    />
                  )}

                  {/* Static inner image */}
                  <div className="w-full h-full rounded-full bg-white p-[3px] relative z-10">
                    <StaticImage
                      src="../images/image.png"
                      className="w-full h-full rounded-full object-cover"
                      alt={user.name}
                    />
                    {user.name === "you" && (
                      <div className=" absolute bottom-0 right-0 w-5 h-5 rounded-full bg-white p-[3px] z-10">
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
            {storyImages.map((_, i) => (
              <div key={i} className="flex-1 h-[2px] rounded">
                <div
                  className="h-full bg-white rounded transition-[width] duration-100"
                  style={{
                    width:
                      i < currentStory
                        ? "100%"
                        : i === currentStory
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            className="absolute top-4 right-4 z-10 bg-white/30 rounded-full p-2 text-white"
            onClick={() => setIsOpen(false)}
          >
            <RxCross2 className="w-7 h-7" />
          </button>

          <div className="flex-1 relative">
            {currentStory === 0 && (
              <StaticImage
                src="../images/image.png"
                className="w-full h-full object-cover"
                alt="story 1"
              />
            )}
            {currentStory === 1 && (
              <StaticImage
                src="../images/image2.png"
                className="w-full h-full object-cover"
                alt="story 2"
              />
            )}
            {currentStory === 2 && (
              <StaticImage
                src="../images/example.png"
                className="w-full h-full object-cover"
                alt="story 3"
              />
            )}
            {currentStory === 3 && (
              <StaticImage
                src="../images/image.png"
                className="w-full h-full object-cover"
                alt="story 4"
              />
            )}
            {currentStory === 4 && (
              <StaticImage
                src="../images/image2.png"
                className="w-full h-full object-cover"
                alt="story 5"
              />
            )}
            {currentStory === 5 && (
              <StaticImage
                src="../images/example.png"
                className="w-full h-full object-cover"
                alt="story 6"
              />
            )}

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2"
              onClick={handlePreviousStory}
            >
              <MdNavigateBefore className="w-7 h-7" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2"
              onClick={handleNextStory}
            >
              <MdNavigateNext className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Stories
