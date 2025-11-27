import * as React from "react"

export type LikedSlidesMap = { [key: string]: string[] }

type LikesContextValue = {
  likedSlides: LikedSlidesMap
  toggleLike: (slideKey: string, username: string) => void
}

const LikesContext = React.createContext<LikesContextValue | null>(null)

export const LikesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [likedSlides, setLikedSlides] = React.useState<LikedSlidesMap>({})

  // Load once on client
  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("likedSlides")
      if (raw) {
        const parsed = JSON.parse(raw) as LikedSlidesMap
        if (parsed && typeof parsed === "object") {
          setLikedSlides(parsed)
        }
      }
    } catch {}
  }, [])

  // Persist on change
  React.useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem("likedSlides", JSON.stringify(likedSlides))
    } catch {}
  }, [likedSlides])

  const toggleLike = React.useCallback((slideKey: string, username: string) => {
    if (!slideKey) return
    setLikedSlides(prev => {
      const usersForSlide = prev[slideKey] || []
      const already = usersForSlide.includes(username)
      return {
        ...prev,
        [slideKey]: already
          ? usersForSlide.filter(u => u !== username)
          : [...usersForSlide, username],
      }
    })
  }, [])

  return (
    <LikesContext.Provider value={{ likedSlides, toggleLike }}>
      {children}
    </LikesContext.Provider>
  )
}

export const useLikes = () => {
  const ctx = React.useContext(LikesContext)
  if (!ctx) throw new Error("useLikes must be used within LikesProvider")
  return ctx
}
