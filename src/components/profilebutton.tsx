import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const ProfileButton: React.FC<{ name: string }> = ({ name }) => {
  console.log(name)

  const profileImages = (name: string) => {
    if (name === "alice") {
      return (
        <StaticImage
          src="../images/image7.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
    if (name === "bob") {
      return (
        <StaticImage
          src="../images/image6.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
    if (name === "carol") {
      return (
        <StaticImage
          src="../images/image8.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
    if (name === "dave") {
      return (
        <StaticImage
          src="../images/image9.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
    if (name === "eve") {
      return (
        <StaticImage
          src="../images/image10.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
    return (
      <StaticImage
        src="../images/image5.png"
        className="w-8 h-8 rounded-full object-cover"
        alt="suggestion 1"
      />
    )
  }

  const profileImagePage = () => {
    if (window.location.pathname === "/proile") {
      return (
        <StaticImage
          src="../images/image7.png"
          className="w-11 h-11 rounded-full object-cover"
          alt="suggestion 1"
        />
      )
    }
  }
  return (
    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px">
      <div className="w-full h-full rounded-full bg-white p-[3px]">
        {profileImages(name)}
      </div>
    </div>
  )
}

export default ProfileButton
