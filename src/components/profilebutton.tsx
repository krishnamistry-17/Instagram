import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

type Props = { name: string; size?: "sm" | "lg" }

const ProfileButton: React.FC<Props> = ({ name, size = "" as any }) => {
  const isBrowser = typeof window !== "undefined"
  const isProfilePage =
    isBrowser && window.location.pathname.startsWith("/profile")

  const isLarge = (size as string) === "lg" || (!size && isProfilePage)
  const outerSize = isLarge ? "w-13 h-13" : "w-10 h-10"
  const imgSize = isLarge ? "w-11 h-11" : "w-8 h-8"
  const imgClass = `${imgSize} rounded-full object-cover`

  const renderAvatar = (n: string) => {
    if (n === "alice") {
      return (
        <StaticImage src="../images/image7.png" className={imgClass} alt={n} />
      )
    }
    if (n === "bob") {
      return (
        <StaticImage src="../images/image6.png" className={imgClass} alt={n} />
      )
    }
    if (n === "carol") {
      return (
        <StaticImage src="../images/image8.png" className={imgClass} alt={n} />
      )
    }
    if (n === "dave") {
      return (
        <StaticImage src="../images/image9.png" className={imgClass} alt={n} />
      )
    }
    if (n === "eve") {
      return (
        <StaticImage src="../images/image10.png" className={imgClass} alt={n} />
      )
    }
    // default / "you"
    return (
      <StaticImage src="../images/image5.png" className={imgClass} alt={n} />
    )
  }

  return (
    <div
      className={`${outerSize} rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px`}
    >
      <div className="w-full h-full rounded-full bg-white p-[3px]">
        {renderAvatar(name)}
      </div>
    </div>
  )
}

export default ProfileButton
