import * as React from "react"
import { LikesProvider } from "./src/context/likesContext"
import { StoryProvider } from "./src/context/storyContext"

export const onRenderBody = ({
  setHtmlAttributes,
}: {
  setHtmlAttributes: (attributes: { lang: string }) => void
}) => {
  setHtmlAttributes({ lang: `en` })
}

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return React.createElement(
    StoryProvider,
    null,
    React.createElement(LikesProvider, null, element)
  )
}
