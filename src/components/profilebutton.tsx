import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const ProfileButton: React.FC = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-pink-500 to-yellow-500 p-px">
      <div className="w-full h-full rounded-full bg-white p-[3px]">
        <StaticImage
          src="../images/image.png"
          className="w-8 h-8 rounded-full object-cover"
          alt="suggestion 1"
        />
      </div>
    </div>
  )
}

export default ProfileButton
