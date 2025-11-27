const React = require("react")
const { LikesProvider } = require("./src/context/likesContext")

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}

exports.wrapRootElement = ({ element }) => {
  return React.createElement(LikesProvider, null, element)
}
