export type SlideDef = { id: string; type: "image" | "video" }
export type StoryDef = { id: string; slides: SlideDef[] }

export const storiesData: StoryDef[] = [  
  {
    id: "s1",
    slides: [
      { type: "image", id: "image1" },
      { type: "image", id: "image3" },
      { type: "image", id: "image4" },
      { type: "video", id: "video1" },
    ],
  },
  {
    id: "s2",
    slides: [
      { type: "image", id: "image2" },
      { type: "image", id: "image3" },
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s3",
    slides: [
      { type: "image", id: "image1" },
      { type: "image", id: "image3" },
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s4",
    slides: [
      { type: "image", id: "image1" },
      { type: "image", id: "image2" },
      { type: "video", id: "video1" },
    ],
  },
  {
    id: "s5",
    slides: [
      { type: "image", id: "image2" },
      { type: "image", id: "image3" },
    ],
  },
  {
    id: "s6",
    slides: [
      { type: "video", id: "video1" },
      { type: "image", id: "image4" },
    ],
  },
  {
    id: "s7",
    slides: [
      { type: "image", id: "image3" },
      { type: "image", id: "image4" },
      { type: "video", id: "video1" },
    ],
  },
  {
    id: "s8",
    slides: [
      { type: "image", id: "image4" },
      { type: "image", id: "image5" },
    ],
  },
  {
    id: "s9",
    slides: [
      { type: "image", id: "image8" },
      { type: "image", id: "image9" },
    ],
  },
  {
    id: "s10",
    slides: [
      { type: "image", id: "image9" },
      { type: "image", id: "image10" },
    ],
  },
  {
    id: "s11",
    slides: [
      { type: "image", id: "image10" },
      { type: "image", id: "image6" },
    ],
  },
]
