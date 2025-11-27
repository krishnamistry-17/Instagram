import "./src/styles/global.css"
import { LikesProvider } from "./src/context/likesContext"
import * as React from "react"

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return React.createElement(LikesProvider, null, element)
}
