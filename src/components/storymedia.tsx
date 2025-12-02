import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"
import exampleVideo from "../images/videos/example.mp4"

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
  image11: (
    <StaticImage
      src="../images/image11.png"
      alt="image11"
      className="w-full h-full object-cover"
    />
  ),
  image12: (
    <StaticImage
      src="../images/image12.png"
      alt="image12"
      className="w-full h-full object-cover"
    />
  ),
  image13: (
    <StaticImage
      src="../images/image13.png"
      alt="image13"
      className="w-full h-full object-cover"
    />
  ),
  image14: (
    <StaticImage
      src="../images/image14.png"
      alt="image14"
      className="w-full h-full object-cover"
    />
  ),
  image15: (
    <StaticImage
      src="../images/image15.png"
      alt="image15"
      className="w-full h-full object-cover"
    />
  ),
  image16: (
    <StaticImage
      src="../images/image16.png"
      alt="image16"
      className="w-full h-full object-cover"
    />
  ),
}

export const videoComponents: Record<string, JSX.Element> = {
  video1: <video src={exampleVideo} className="w-full h-full object-cover" />,
}
