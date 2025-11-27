import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export type SlideDef = { id: string; type: "image" | "video" }
export type StoryDef = { id: string; user: string; slides: SlideDef[] }

export const storiesData: StoryDef[] = [
  {
    id: "s1",
    user: "you",
    slides: [],
  },
  {
    id: "s2",
    user: "alice",
    slides: [
      { type: "image", id: "image2" },
      { type: "image", id: "image3" },
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s3",
    user: "bob",
    slides: [
      { type: "image", id: "image1" },
      { type: "image", id: "image3" },
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s4",
    user: "carol",
    slides: [
      { type: "image", id: "image1" },
      { type: "image", id: "image2" },
      { type: "video", id: "video1" },
    ],
  },
  {
    id: "s5",
    user: "dave",
    slides: [
      { type: "image", id: "image2" },
      { type: "image", id: "image3" },
    ],
  },
  {
    id: "s6",
    user: "eve",
    slides: [
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s7",
    user: "jack",
    slides: [
      { type: "image", id: "image3" },
      { type: "image", id: "image4" },
      { type: "video", id: "video1" },
    ],
  },
  {
    id: "s8",
    user: "lily",
    slides: [
      { type: "image", id: "image4" },
      { type: "image", id: "image5" },
    ],
  },
  {
    id: "s9",
    user: "lucy",
    slides: [
      { type: "image", id: "image8" },
      { type: "image", id: "image9" },
    ],
  },
  {
    id: "s10",
    user: "mary",
    slides: [
      { type: "image", id: "image9" },
      { type: "image", id: "image10" },
    ],
  },
  {
    id: "s11",
    user: "nina",
    slides: [
      { type: "image", id: "image10" },
      { type: "image", id: "image6" },
    ],
  },
  {
    id: "s12",
    user: "olive",
    slides: [{ type: "image", id: "image6" }],
  },
]

export const renderAvatar = (name: string) => {
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
  if (name === "lily") {
    return (
      <StaticImage
        src="../images/image8.png"
        className="w-full h-full rounded-full object-cover"
        alt={name}
      />
    )
  }
  if (name === "lucy") {
    return (
      <StaticImage
        src="../images/image8.png"
        className="w-full h-full rounded-full object-cover"
        alt={name}
      />
    )
  }
  if (name === "mary") {
    return (
      <StaticImage
        src="../images/image9.png"
        className="w-full h-full rounded-full object-cover"
        alt={name}
      />
    )
  }
  if (name === "nina") {
    return (
      <StaticImage
        src="../images/image10.png"
        className="w-full h-full rounded-full object-cover"
        alt={name}
      />
    )
  }
  if (name === "olive") {
    return (
      <StaticImage
        src="../images/image6.png"
        className="w-full h-full rounded-full object-cover"
        alt={name}
      />
    )
  }
  return (
    <StaticImage
      src="../images/image5.png"
      className="w-full h-full rounded-full object-cover"
      alt={name}
    />
  )
}
