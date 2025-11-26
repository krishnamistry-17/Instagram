import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

export const imageComponents: Record<string, JSX.Element> = {
  image1: (
    <StaticImage
      src="../images/image2.png"
      alt="image1"
      className="w-full h-full object-cover"
    />
  ),
  image2: (
    <StaticImage
      src="../images/image3.png"
      alt="image2"
      className="w-full h-full object-cover"
    />
  ),
  image3: (
    <StaticImage
      src="../images/image4.png"
      alt="image3"
      className="w-full h-full object-cover"
    />
  ),
  image4: (
    <StaticImage
      src="../images/image5.png"
      alt="image4"
      className="w-full h-full object-cover"
    />
  ),
  image5: (
    <StaticImage
      src="../images/image6.png"
      alt="image5"
      className="w-full h-full object-cover"
    />
  ),
  image6: (
    <StaticImage
      src="../images/image7.png"
      alt="image6"
      className="w-full h-full object-cover"
    />
  ),
  image7: (
    <StaticImage
      src="../images/image8.png"
      alt="image7"
      className="w-full h-full object-cover"
    />
  ),
  image8: (
    <StaticImage
      src="../images/image9.png"
      alt="image8"
      className="w-full h-full object-cover"
    />
  ),
  image9: (
    <StaticImage
      src="../images/image10.png"
      alt="image9"
      className="w-full h-full object-cover"
    />
  ),
  image10: (
    <StaticImage
      src="../images/image6.png"
      alt="image10"
      className="w-full h-full object-cover"
    />
  ),
}
